import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { Injectable } from '@nestjs/common';
import { AddBlogType } from 'src/types';
import fs from 'fs';
import { ImageKitService } from 'src/image-kit/image-kit.service';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel('blog') private blogModel: Model<BlogDocument>,
        private readonly imageKitService: ImageKitService
    ) { }

    async addBlog(body: AddBlogType) {
        try {
            const { title, subTitle, description, category, isPublished, imageFile } = body;

            if (!title || !subTitle || !description || !category || !imageFile) {
                return { success: false, message: 'Missing required fields' };
            }

            const fileBuffer = fs.readFileSync(imageFile.path);

            // upload to imagekit
            const imagekit = this.imageKitService.getInstance();
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: '/blogs'
            });

            const optimizedImageUrl = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: 'webp' },
                    { width: '1280' }
                ]
            });

            const blog = await this.blogModel.create({
                title,
                subTitle,
                description,
                category,
                isPublished,
                image: optimizedImageUrl
            });

            return { success: true, blog };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Upload failed' };
        }
    }
}
