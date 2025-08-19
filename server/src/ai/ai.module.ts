import { Global, Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { config } from 'dotenv';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [AiService],
  controllers: [AiController],
  exports: [AiService ]
})
export class AiModule { }
