import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment } from './comment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'comment', schema: Comment }])],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule { }
