import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentService {
    constructor(@InjectModel("comment") commentModel) {
    }
    async addComment(body) {
        try {
            const { blog, name, content } = body
        } catch (error) {
            return { success: false, message: error.message }
        }

    }
}
