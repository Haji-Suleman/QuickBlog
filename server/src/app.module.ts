import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogModule } from './Blog/blog.module';
import { AdminModule } from './admin/admin.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    controllers: [AppController],
    imports: [
        BlogModule,
        MulterModule.register({
            dest: 'uploads/',
            storage: 'disk',
            limits: { fileSize: 5 * 1024 * 1024 },
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
    ],
})

export class AppModule { }
