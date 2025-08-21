import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { Injectable } from '@nestjs/common';
import { AddBlogType } from 'src/types';
import { CommentDocument } from 'src/comment/comment.schema';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel('blog') private blogModel: Model<BlogDocument>,
        @InjectModel('comment') private commentModel: Model<CommentDocument>,
        private aiService: AiService
    ) { }

    async addBlog(body: AddBlogType, file) {
        try {
            const { title, subTitle, description, category, isPublished } = body;
            console.log(body)

            if (!title || !subTitle || !description || !category || !file) {
                return { success: false, message: 'Missing required fields' };
            }

            const imageUrl = `/uploads/${file.filename}`;

            await this.blogModel.create({
                title,
                subTitle,
                description,
                category,
                isPublished,
                image: imageUrl,
            });

            return { success: true, message: 'Blog added successfully', image: imageUrl };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
    async getAllBlogs() {
        try {
            const blogs = await this.blogModel.find({ isPublished: true })
            return { success: true, blogs }
        } catch (error) {
            return { success: false, message: error.message }
        }

    }
    async getBlogById(blogId: string) {
        try {
            // from the parse
            const blog = await this.blogModel.findById(blogId)
            return { success: true, blog }

        } catch (error) {
            console.log(error)
            return { success: false, message: error.message }
        }
    }
    async deleteBlogById(blogId: string) {
        try {
            const blog = await this.blogModel.findByIdAndDelete(blogId)
            if (!blog) {
                return { success: false, message: "Blog not Found" }
            }
            await this.commentModel.deleteMany({ blog: blogId })
            return { success: true, blog, message: "Blog deleted successfully" }

        } catch (error) {
            console.log(error)
            return { success: false, message: error.message }
        }
    }
    async togglePublish(id: string) {
        try {
            const blog = await this.blogModel.findById(id);
            if (!blog) {
                return { success: false, message: "Blog not found" };
            }

            blog.isPublished = !blog.isPublished;
            await blog.save();
            return { success: true, message: "Blog updated successfully", isPublished: blog.isPublished };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
    async addComment(body) {
        try {
            const { blog, name, content } = body
            console.log(blog, name, content)
            await this.commentModel.create({ blog, name, content })
            return { success: true, message: "Comment added for review" }

        } catch (error) {
            return { success: false, message: error.message }

        }
    }
    async getBlogsComments(body) {
        try {
            const { blogId } = body;
            const comments = await this.commentModel.find({ blog: blogId, isApproved: true }).sort(({ createdAt: -1 }))
            return { success: true, comments }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }
    async generateContent(body) {
        try {
            const { prompt } = body
            const content = await this.aiService.main(prompt + "Generate a blog content for this topic in simple text format")
            console.log(prompt)
            console.log(content)
            return { success: true, content }
        } catch (error) {
            return { success: false, message: error.message }
        }

    }

}

