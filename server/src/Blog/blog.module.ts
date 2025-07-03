import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { ImageKitModule } from 'src/image-kit/image-kit.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'blog', schema: BlogSchema }]), ImageKitModule],
    providers: [BlogService],
    controllers: [BlogController]

})
export class BlogModule { }
