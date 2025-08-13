import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Injectable()
export class CommentService {
    constructor(@InjectModel("comment") private readonly commentModel: Model<Document>, @InjectModel("comment") private readonly blogModel: Model<Document>) {
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
    async getDashboard(body) {
        try {
            const recentBlogs = await this.blogModel.find({}).sort({ createdAt: -1 }).limit(5) // i have to finish the blog model by adding the blog not the comment
            const blogs = await this.blogModel.countDocuments(); // i have to finish the blog model by adding the blog not the comment
            const comments = await this.commentModel.countDocuments()
            const drafts = await this.blogModel.countDocuments({ isPublished: true })// i have to finish the blog model by adding the blog not the comment
            const dashboardData = {
                blogs, comments, drafts, recentBlogs
            }
            return { success: true, dashboardData }
        }
        catch (error) {
            return { success: false, message: error.message }
        }
    }
    async deleteCommentById(body) {
        try {
            const { id } = body
            await this.commentModel.findByIdAndDelete(id)
            return { success: true, message: "Comment deleted successfully" }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }
    async approveCommentById(body) {
        try {
            const { id } = body;
            await this.commentModel.findByIdAndUpdate(id, { isApproved: true });
            return { success: true, message: "Comment Approved successfully" }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }
}
