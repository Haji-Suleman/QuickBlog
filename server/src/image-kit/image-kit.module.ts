import { Module } from '@nestjs/common';
import { ImageKitService } from './image-kit.service';

@Module({
  providers: [ImageKitService],
  exports: [ImageKitService]
})
export class ImageKitModule { }
