import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from 'src/Blog/blog.schema';
import { Comment } from 'src/comment/comment.schema';
import auth from 'src/middleware/auth.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forFeature([{ name: 'blog', schema: BlogSchema }]), MongooseModule.forFeature([{ name: 'comment', schema: Comment }])],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(auth).exclude("/api/admin/login").forRoutes(AdminController)
  }

}
