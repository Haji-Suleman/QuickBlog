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
        consumer.apply(auth).forRoutes({ path: "/delete", method: RequestMethod.POST }, { path: "/toggle-publish", method: RequestMethod.POST })
    }
    @Post('add')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    addBlog(@UploadedFile() file, @Body() body: AddBlogType) {
        return this.blogService.addBlog(body, file);
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

}