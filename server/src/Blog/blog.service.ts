import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { Injectable } from '@nestjs/common';
import { AddBlogType } from 'src/types';
import { Express } from 'express';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel('blog') private blogModel: Model<BlogDocument>,
    ) { }

    async addBlog(body: AddBlogType, file) {
        try {
            const { title, subTitle, description, category, isPublished } = body;

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

            return { success: true, message: 'Blog created', image: imageUrl };
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
            // from the body
            const blog = await this.blogModel.findByIdAndDelete(blogId)
            if (!blog) {
                return { success: false, message: "Blog not Found" }
            }
            return { success: true, blog }

        } catch (error) {
            console.log(error)
            return { success: false, message: error.message }
        }
    }
    async togglePublish(id: string) {
        try {
            const blog = await this.blogModel.findByIdAndUpdate(id);
            if (blog) {
                await blog.save();
                return { success: true, message: "Blog updated successfully" };
            } else {
                return { success: false, message: "Blog not found" };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }


}
