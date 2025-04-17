import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audio, AudioStatus } from './entities/audio.entity';
import { CreateAudioDto } from './dto/create-audio.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AudioService {
  constructor(
    @InjectRepository(Audio)
    private readonly audioRepository: Repository<Audio>,
  ) {}

  async create(createAudioDto: CreateAudioDto): Promise<Audio> {
    const audio = this.audioRepository.create({
      ...createAudioDto,
      status: AudioStatus.PROCESSING,
    });
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
    this.processAudio(audio.id).catch(console.error);
    return audio;
  }

  private async processAudio(id: string): Promise<void> {
    // Simulate audio processing
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const audio = await this.findOne(id);
    await this.updateAudioStatus(id, AudioStatus.COMPLETED, {
      filePath: '/path/to/audio.mp3',
      duration: 300,
      fileSize: 1024 * 1024 * 5,
      format: 'mp3',
      bitrate: 192000,
      sampleRate: 44100,
      channels: 2,
    });
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
} 