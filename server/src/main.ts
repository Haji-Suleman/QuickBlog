import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

let cachedServer: any;

async function bootstrapServer() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.init();
  return app.getHttpAdapter().getInstance();
}

// This export is required for Vercel
export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return cachedServer(req, res);
}

// Only start listening if run directly (local dev)
if (require.main === module) {
  bootstrapServer().then(server => {
    server.listen(process.env.PORT ?? 3000, () => {
      console.log(`Server running on http://localhost:${process.env.PORT ?? 3000}`);
    });
  });
}
