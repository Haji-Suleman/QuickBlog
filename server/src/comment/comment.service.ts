import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Injectable()
export class CommentService {
    constructor(@InjectModel("comment") private readonly commentModel: Model<Document>) {
    }
    async addComment(body) {
        try {
            const { blog, name, content } = body
            await this.commentModel.create(blog, name, content)
            return { success: true, message: "Comment  added for reviews" }
        } catch (error) {
            return { success: false, message: error.message }
        }

    }
    async getBlogsComment(body) {
        try {
            const { blogId } = body
            const comments = await this.commentModel.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 })
            return { success: true, comments }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }
    async getAllComment(body) {
        try {
            const comments = await this.commentModel.find({}).populate("blog").sort({ createdAt: -1 })
            return { success: true, comments }
        } catch (error) {
            return { success: false, message: error.message }

        }
    }
    async getDeashboard(body) {
        try {
            const recentBlogs = await this.commentModel.find({}).sort({ createdAt: -1 }).limit(5)
            const blogs = await this.commentModel.countDocuments();
            const 
        }
        catch (error) {
            return { success: false, message: error.message }
        }
    }
}
