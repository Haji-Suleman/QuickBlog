import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'blog', schema: BlogSchema }])],
    providers: [BlogService],
    controllers: [BlogController]

})
export class BlogModule { }
