import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { InjectModel } from '@nestjs/mongoose';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {
    }
    @Post("/add-comment")
    async addComment(@Body() body) {
        return this.commentService.addComment(body)
    }
    @Post("/comments")
    async getApprovedBlogs(@Body() body) {
        return this.commentService.getBlogsComment(body)
    }
}
