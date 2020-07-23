import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  // mongoose.connect('mongodb://10.211.55.6/nest-blog-api', {
  //   useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true
  // })

  const app = await NestFactory.create(AppModule);

  //全局管道
  app.useGlobalPipes(new ValidationPipe())

  //监听所有路由请求，打印日志
  // app.use(logger)
  // app.setGlobalPrefix('nest-zero-to-one')


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
