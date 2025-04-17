import { Controller, Post, Body, UseGuards, BadRequestException, Get, Param, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ImportMangaListDto } from './dto/import-manga-list.dto';
import { MangaInfo } from './entities/manga-info.entity';
import { Manga } from '../manga/entities/manga.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

interface JobProgress {
  status?: string;
  total?: number;
  processed?: number;
  percentage?: number;
  currentManga?: string;
  successCount?: number;
  failedCount?: number;
}

@Controller('sources')
@UseGuards(JwtAuthGuard)
export class SourcesController {
  private readonly logger = new Logger(SourcesController.name);

  constructor(
    private readonly sourcesService: SourcesService,
    @InjectQueue('import-manga') private readonly importMangaQueue: Queue,
  ) {}

  @Post('import-list')
  async importMangaList(
    @Body() importMangaListDto: ImportMangaListDto,
  ): Promise<MangaInfo[]> {
    return this.sourcesService.importManga(
      importMangaListDto.url,
      importMangaListDto.sourceType,
    );
  }

  @Post('save-manga-list')
  async saveMangaList(@Body() mangaList: MangaInfo[]): Promise<{ jobId: string }> {
    try {
      this.logger.log('Received request to save manga list');
      
      if (!mangaList) {
        throw new HttpException('Invalid manga list data', HttpStatus.BAD_REQUEST);
      }

      const job = await this.importMangaQueue.add('import-manga-list', mangaList, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      });

      this.logger.log(`Created import job with ID: ${job.id}`);
      return { jobId: job.id.toString() };
    } catch (error) {
      this.logger.error('Failed to create import job:', error.stack);
      throw new HttpException(
        error.message || 'Failed to create import job',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('save-manga-with-images')
  async saveMangaWithImages(@Body() mangaInfo: MangaInfo): Promise<Manga> {
    return this.sourcesService.saveMangaWithImages(mangaInfo);
  }

  @Post('stop-job/:jobId')
  async stopJob(@Param('jobId') jobId: string) {
    try {
      this.logger.log(`Attempting to stop job ${jobId}`);
      
      const job = await this.importMangaQueue.getJob(jobId);
      if (!job) {
        throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
      }

      const state = await job.getState();
      if (state === 'completed' || state === 'failed') {
        throw new HttpException('Job is already finished', HttpStatus.BAD_REQUEST);
      }

      // Đánh dấu job là đã bị dừng
      await job.update({
        ...job.data,
        isStopped: true
      });

      // Dừng job
      await job.moveToFailed(new Error('Job stopped by user'), true);

      return {
        success: true,
        message: 'Job stopped successfully',
        jobId
      };
    } catch (error) {
      this.logger.error(`Failed to stop job ${jobId}:`, error.stack);
      throw new HttpException(
        error.message || 'Failed to stop job',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('job-status/:jobId')
  async getJobStatus(@Param('jobId') jobId: string) {
    try {
      this.logger.log(`Checking status for job ${jobId}`);
      const job = await this.importMangaQueue.getJob(jobId);
      
      if (!job) {
        this.logger.warn(`Job ${jobId} not found`);
        return { status: 'not_found' };
      }

      const state = await job.getState();
      const progress = (job.progress || {}) as JobProgress;
      const result = job.returnvalue;
      const failedReason = job.failedReason;
      const attemptsMade = job.attemptsMade;
      const timestamp = job.timestamp;
      const isStopped = job.data?.isStopped || false;

      this.logger.log(`Job ${jobId} status: ${state}, progress: ${JSON.stringify(progress)}`);

      return {
        jobId,
        status: state,
        isStopped,
        progress: {
          status: progress.status || 'unknown',
          total: progress.total || 0,
          processed: progress.processed || 0,
          percentage: progress.percentage || 0,
          currentManga: progress.currentManga || null,
          successCount: progress.successCount || 0,
          failedCount: progress.failedCount || 0
        },
        result,
        failedReason,
        attemptsMade,
        timestamp,
        duration: timestamp ? Date.now() - timestamp : 0
      };
    } catch (error) {
      this.logger.error(`Failed to get job status for ${jobId}:`, error.stack);
      throw new HttpException(
        error.message || 'Failed to get job status',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 