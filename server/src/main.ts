import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

let cachedServer: any;

async function bootstrapServer() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://quick-blog-sigma.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.init();

  return app.getHttpAdapter().getInstance();
}

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }

  return cachedServer(req, res);
}

if (require.main === module) {
  bootstrapServer().then(server => {
    server.listen(process.env.PORT ?? 3000, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT ?? 3000}`,
      );
    });
  });
}