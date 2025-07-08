import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[ConfigModule.forRoot({isGlobal:true})],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
