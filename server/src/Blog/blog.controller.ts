import { Controller, Post, Get, Body } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blogs')
export class BlogController {
    constructor(private blogService: BlogService) { }



}
