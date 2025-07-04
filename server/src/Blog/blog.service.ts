import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { Injectable } from '@nestjs/common';
import { AddBlogType } from 'src/types';
@Injectable()
export class BlogService {
    constructor(
        @InjectModel('blog') private blogModel: Model<BlogDocument>,
    ) { }

    async addBlog(body: AddBlogType) {
        try {
            // const { title, subTitle, description, category, isPublished, imageFile } = body;
// 
            // if (!title || !subTitle || !description || !category || !imageFile) {
                // return { success: false, message: 'Missing required fields' };
            // }

            // upload to imagekit
            // const blog = await this.blogModel.create({
                // title,
                // subTitle,
                // description,
                // category,
                // isPublished,
            // });

            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Upload failed' };
        }
    }
}
