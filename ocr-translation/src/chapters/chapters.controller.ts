import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ChaptersService } from './chapters.service';

@Controller('manga/:mangaId/chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('content', {
      storage: diskStorage({
        destination: './uploads/chapters',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Param('mangaId') mangaId: string,
    @Body() createChapterDto: CreateChapterDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    try {
      console.log('Creating chapter with data:', { mangaId, createChapterDto, file });
      return this.chaptersService.create(mangaId, {
        ...createChapterDto,
        content: file ? `/uploads/chapters/${file.filename}` : createChapterDto.content,
        contentType: file ? 'image' : 'text',
      });
    } catch (error) {
      console.error('Error creating chapter:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  findAll(
    @Param('mangaId') mangaId: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      console.log('Finding chapters with params:', { mangaId, page, pageSize });
      return this.chaptersService.findAll(mangaId, page, pageSize);
    } catch (error) {
      console.error('Error finding chapters:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('mangaId') mangaId: string, @Param('id') id: string) {
    try {
      console.log('Finding chapter with params:', { mangaId, id });
      return this.chaptersService.findOne(mangaId, id);
    } catch (error) {
      console.error('Error finding chapter:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('content', {
      storage: diskStorage({
        destination: './uploads/chapters',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  update(
    @Param('mangaId') mangaId: string,
    @Param('id') id: string,
    @Body() updateChapterDto: UpdateChapterDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    try {
      console.log('Updating chapter with data:', { mangaId, id, updateChapterDto, file });
      return this.chaptersService.update(mangaId, id, {
        ...updateChapterDto,
        content: file ? file.path : updateChapterDto.content,
        contentType: file ? 'image' : 'text',
      });
    } catch (error) {
      console.error('Error updating chapter:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('mangaId') mangaId: string, @Param('id') id: string) {
    try {
      console.log('Deleting chapter with params:', { mangaId, id });
      return this.chaptersService.remove(mangaId, id);
    } catch (error) {
      console.error('Error deleting chapter:', error);
      throw new BadRequestException(error.message);
    }
  }
} 