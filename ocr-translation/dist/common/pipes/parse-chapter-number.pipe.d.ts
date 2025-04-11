import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ParseChapterNumberPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): number;
}
