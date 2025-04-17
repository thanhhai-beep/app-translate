import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { SourcesService } from '../sources.service';
import { MangaInfo } from '../types/manga-info.interface';
import { Manga } from '@/manga/entities/manga.entity';

interface JobData {
  mangaList: MangaInfo[];
  isStopped?: boolean;
}

@Injectable()
@Processor('import-manga')
export class ImportMangaQueue {
  private readonly logger = new Logger(ImportMangaQueue.name);

  constructor(private readonly sourcesService: SourcesService) {}

  @Process('import-manga-list')
  async handleImportMangaList(job: Job<JobData>) {
    try {
      this.logger.log(`Starting import job ${job.id}`);
      const { mangaList } = job.data;
      
      if (!mangaList || !Array.isArray(mangaList)) {
        throw new Error('Invalid manga list data');
      }

      const totalManga = mangaList.length;
      this.logger.log(`Processing ${totalManga} manga items`);
      
      await job.progress({
        status: 'started',
        total: totalManga,
        processed: 0,
        percentage: 0
      });

      const result: Manga[] = [];
      let processedCount = 0;
      
      for (const mangaInfo of mangaList) {
        const currentJob = await job.queue.getJob(job.id);
        if (currentJob?.data?.isStopped) {
          this.logger.log(`Job ${job.id} was stopped by user`);
          throw new Error('Job stopped by user');
        }

        try {
          const savedManga = await this.sourcesService.saveMangaAndChapters(mangaInfo);
          result.push(savedManga);
          
          processedCount++;
          const percentage = Math.round((processedCount / totalManga) * 100);
          
          await job.progress({
            status: 'processing',
            total: totalManga,
            processed: processedCount,
            percentage,
            currentManga: mangaInfo.title
          });
          
          this.logger.log(`Processed ${processedCount}/${totalManga} manga (${percentage}%)`);
        } catch (error) {
          this.logger.error(`Failed to process manga ${mangaInfo.title}:`, error);
        }
      }

      await job.progress({
        status: 'completed',
        total: totalManga,
        processed: processedCount,
        percentage: 100,
        successCount: result.length,
        failedCount: totalManga - result.length
      });
      
      this.logger.log(`Successfully imported ${result.length} manga items`);
      
      return {
        success: true,
        data: result,
        total: totalManga,
        processed: processedCount,
        successCount: result.length,
        failedCount: totalManga - result.length
      };
    } catch (error) {
      this.logger.error(`Job ${job.id} failed:`, error.stack);
      throw new Error(`Failed to import manga list: ${error.message}`);
    }
  }
} 