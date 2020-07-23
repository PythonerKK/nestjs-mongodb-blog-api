import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as mongoose from 'mongoose'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // mongoose.connect('mongodb://10.211.55.6/nest-blog-api', {
  //   useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true
  // })

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  const options = new DocumentBuilder()
    .setTitle("nest博客api")
    .setDescription("第一个nest项目")
    .setVersion("1.0")
    .addTag("kk")
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("api-docs", app, document)

  await app.listen(3000);
}
bootstrap();
