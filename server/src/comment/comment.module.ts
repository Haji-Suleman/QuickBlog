import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment } from './comment.schema';
import { BlogSchema } from 'src/Blog/blog.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'comment', schema: Comment }]), MongooseModule.forFeature([{ name: 'blog', schema: BlogSchema }])],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule { }
