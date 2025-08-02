import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import auth from 'src/middleware/auth.middleware';
import { Comment } from 'src/comment/comment.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'blog', schema: BlogSchema }]), MongooseModule.forFeature([{ name: 'comment', schema: Comment }])],
    providers: [BlogService],
    controllers: [BlogController],
    exports: [BlogService]

})
export class BlogModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(auth).forRoutes("api/blogs/add")
    }
}
