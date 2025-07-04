import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlogService } from './blog.service';
import { Express } from 'express';

@Controller('blogs')
export class BlogController {
    constructor(private blogService: BlogService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    handleUpload(@UploadedFile() file) {
        console.log(file.originalname, file.filename, file.path)
        return {
            originalname: file.originalname,
            filename: `./uploads/${file.originalname}-${Date.now()}`,
            path: file.path,
        };
    }
}
