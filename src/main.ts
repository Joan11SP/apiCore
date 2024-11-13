import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false } );

  let port = 3000;
  await app.listen(port);
  console.info(`Microservicio apiCore escuchando en el puerto: ${port}`);
}
bootstrap();
