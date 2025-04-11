import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseChapterNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === undefined || value === null) {
      throw new BadRequestException('Chapter number is required');
    }

    const number = Number(value);
    if (isNaN(number)) {
      throw new BadRequestException('Chapter number must be a valid number');
    }

    return number;
  }
} 