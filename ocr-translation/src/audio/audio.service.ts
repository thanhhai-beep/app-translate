import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audio, AudioStatus } from './entities/audio.entity';
import { CreateAudioDto } from './dto/create-audio.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Between } from 'typeorm';
import { Chapter } from '@/chapters/entities/chapter.entity';
const gTTS = require('gtts');
import * as cheerio from 'cheerio';

@Injectable()
export class AudioService {
  constructor(
    @InjectRepository(Audio)
    private readonly audioRepository: Repository<Audio>,
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
  ) {}

  async create(createAudioDto: CreateAudioDto): Promise<Audio> {
    const chapters = await this.chapterRepository.find({
      where: {
        mangaId: createAudioDto.mangaId,
        chapterNumber: Between(createAudioDto.startChapterNumber, createAudioDto.endChapterNumber)
      },
      order: {
        chapterNumber: 'ASC'
      }
    });

    if (chapters.length === 0) {
      throw new NotFoundException('No chapters found for the specified range');
    }

    const audioDetail = {
      title: createAudioDto.title,
      mangaId: createAudioDto.mangaId,
      startChapter: chapters[0],
      endChapter: chapters[chapters.length - 1],
      filePath: "uploads/audio",
      status: AudioStatus.PROCESSING
    } as Partial<Audio>;
    
    const audio = this.audioRepository.create(audioDetail);
    
    await this.audioRepository.save(audio);
    this.processAudio(audio.id).catch(console.error);
    return audio;
  }

  async findAll(): Promise<Audio[]> {
    return this.audioRepository.find();
  }

  async findOne(id: string): Promise<Audio> {
    const audio = await this.audioRepository.findOne({ where: { id } });
    if (!audio) {
      throw new NotFoundException(`Audio with ID "${id}" not found`);
    }
    return audio;
  }

  async findByMangaId(mangaId: string): Promise<Audio[]> {
    return this.audioRepository.find({ where: { mangaId } });
  }

  async remove(id: string): Promise<void> {
    const result = await this.audioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Audio with ID "${id}" not found`);
    }
  }

  async regenerate(id: string): Promise<Audio> {
    const audio = await this.findOne(id);
    audio.status = AudioStatus.PROCESSING;
    audio.errorMessage = '';
    await this.audioRepository.save(audio);

    try {
      const startChapter = await this.chapterRepository.findOneOrFail({where: { id: audio.startChapterId }});
      const endChapter = await this.chapterRepository.findOneOrFail({where: { id: audio.endChapterId }});

      const chapters = await this.chapterRepository.find({
        where: {
          mangaId: audio.mangaId,
          chapterNumber: Between(startChapter.chapterNumber, endChapter.chapterNumber),
        },
        order: {
          chapterNumber: 'ASC',
        },
      });

      const textContent = `Đây là nội dung giả lập cho audio ID ${id}. Bạn có thể thay bằng nội dung thật từ chương.`;
      const filename = `audio_${Date.now()}.mp3`;
      const outputDir = path.join(__dirname, '..', '..', 'uploads', 'audios');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      const filepath = path.join(outputDir, filename);

      const gtts = new gTTS(textContent, 'vi');
      await new Promise<void>((resolve, reject) => {
        gtts.save(filepath, (err: any) => {
          if (err) return reject(err);
          resolve();
        });
      });

      const fileStats = fs.statSync(filepath);

      await this.updateAudioStatus(id, AudioStatus.COMPLETED, {
        filePath: `/public/audios/${filename}`,
        duration: 0,
        fileSize: fileStats.size,
        format: 'mp3',
        bitrate: 128000,
        sampleRate: 44100,
        channels: 1,
      });

    } catch (err) {
      audio.status = AudioStatus.FAILED;
      audio.errorMessage = err.message || 'Unknown error';
      await this.audioRepository.save(audio);
      console.error('Error generating audio:', err);
    }

    return audio;
  }

  private async textToAudio(text: string, lang = 'vi'): Promise<string> {
    const filename = `audio_${Date.now()}.mp3`;
    const filepath = path.join('uploads/audios', filename);

    return new Promise((resolve, reject) => {
      const gtts = new gTTS(text, lang);
      gtts.save(filepath, (err: any) => {
        if (err) return reject(err);
        resolve(filepath);
      });
    });
  }

  private async processAudio(id: string): Promise<void> {
    try {
      const audio = await this.findOne(id);

      const startChapter = await this.chapterRepository.findOneOrFail({
        where: { id: audio.startChapterId },
      });

      const endChapter = await this.chapterRepository.findOneOrFail({
        where: { id: audio.endChapterId },
      });

      const chapters = await this.chapterRepository.find({
        where: {
          mangaId: audio.mangaId,
          chapterNumber: Between(startChapter.chapterNumber, endChapter.chapterNumber),
        },
        order: {
          chapterNumber: 'ASC',
        },
      });

      const htmlTexts = await Promise.all(
        chapters.map(ch => this.extractTextFromHtml(ch.content || ''))
      );

      const fullText = htmlTexts.join('\n\n');
      const filePath = await this.textToAudio(fullText);

      await this.updateAudioStatus(id, AudioStatus.COMPLETED, {
        filePath,
        duration: 300,
        fileSize: 1024 * 1024 * 5,
        format: 'mp3',
        bitrate: 192000,
        sampleRate: 44100,
        channels: 2,
      });
    } catch (error) {
      console.error('Error processing audio:', error);
      await this.updateAudioStatus(id, AudioStatus.FAILED);
    }
  }


  private async updateAudioStatus(
    id: string,
    status: AudioStatus,
    fileDetails?: {
      filePath: string;
      duration: number;
      fileSize: number;
      format: string;
      bitrate: number;
      sampleRate: number;
      channels: number;
    },
  ): Promise<void> {
    const updateData: Partial<Audio> = {
      status,
      ...fileDetails,
    };
    await this.audioRepository.update(id, updateData);
  }

  async getAudioFile(audio: Audio): Promise<fs.ReadStream> {
    if (!audio.filePath) {
      throw new NotFoundException('Audio file not found');
    }
    return fs.createReadStream(audio.filePath);
  }

  async extractTextFromHtml(html: string): Promise<string> {
    const $ = cheerio.load(html || '');
    return $('p').text();
  }
} 