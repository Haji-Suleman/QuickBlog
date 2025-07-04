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
            return { success: false, message: 'Blog creation failed' };
        }
    }
}
