import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogModule } from './Blog/blog.module';
import { AdminModule } from './admin/admin.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommentModule } from './comment/comment.module';

@Module({
    controllers: [AppController],
    imports: [
        BlogModule,
        MulterModule.register({
            dest: './uploads',
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const uri = configService.get('MONGODB_URL');
                return { uri };
            },
            inject: [ConfigService],
        }),
        AdminModule,
        CommentModule,
    ],
})

export class AppModule { }

// connection string mongodb+srv://gocerok690:dbpassword@cluster0.w8999gj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// gocerok690@asimarif.com
// haji1212
// dbPassword : dbpassword
    