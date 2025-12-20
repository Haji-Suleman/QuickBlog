import { Controller, Post, UploadedFile, Body, UseInterceptors, Get, Param, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BlogService } from './blog.service';
import { AddBlogType } from 'src/types';
import auth from 'src/middleware/auth.middleware';

@Controller('api/blogs')
export class BlogController implements NestModule {
    constructor(private readonly blogService: BlogService) { }
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(auth).forRoutes(
            { path: 'api/blogs/delete', method: RequestMethod.POST },
            { path: 'api/blogs/toggle-publish', method: RequestMethod.POST },
            { path: 'api/blogs/generate', method: RequestMethod.POST }

        );

    }
    @Post('add')
    @UseInterceptors(
        FileInterceptor('image', {  // Changed from 'file' to 'image'
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                    cb(null, true);
                } else {
                    cb(new Error('Only image files are allowed!'), false);
                }
            },
            limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
        }),
    )
    async addBlog(@UploadedFile() image: File, @Body() body: { blog: AddBlogType }) {
        try {
            const blogData = typeof body.blog === 'string' ? JSON.parse(body.blog) : body;
            return await this.blogService.addBlog(blogData, image);
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Invalid request format.' };
        }
    }
    @Get('all')
    getAllBlogs() {
        return this.blogService.getAllBlogs();
    }
    @Get('/:blogId')
    getBlogById(@Param('blogId') id: string) {
        return this.blogService.getBlogById(id);
    }
    @Post("/delete")
    deleteBlogById(@Body("id") id: string) {
        return this.blogService.deleteBlogById(id)
    }
    @Post("/toggle-publish")
    togglePublish(@Body("id") id: string) {
        return this.blogService.togglePublish(id)
    }
    @Post("/add-comment")
    addComment(@Body() body) {
        return this.blogService.addComment(body)
    }
    @Post("/comments")
    getBlogComments(@Body() body) {
        return this.blogService.getBlogsComments(body)
    }
    @Post("/generate")
    generateContent(@Body() body) {
        return this.blogService.generateContent(body)
    }
}