import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const allowedOrigins = ['http://127.0.0.1:3000', 'http://127.0.0.1:3001'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  });

  await app.listen(9090);
}

bootstrap();
