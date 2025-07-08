import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import auth from 'src/middleware/auth.middleware';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'blog', schema: BlogSchema }])],
    providers: [BlogService],
    controllers: [BlogController]

})
export class BlogModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(auth).forRoutes("blogs/add")
    }
}
