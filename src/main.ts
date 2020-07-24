import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionFilter } from './filter/any-exception.filter';


async function bootstrap() {
  // mongoose.connect('mongodb://10.211.55.6/nest-blog-api', {
  //   useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true
  // })

  const app = await NestFactory.create(AppModule);

  //全局管道
  app.useGlobalPipes(new ValidationPipe())

  // 全局拦截器，打印返回参数
  app.useGlobalInterceptors(new TransformInterceptor());

  //监听所有路由请求，打印日志
  // app.use(logger)

  // 全局过滤器，处理http异常
  // app.useGlobalFilters(new HttpExceptionFilter())
  // app.useGlobalFilters(new AllExceptionFilter())


  const options = new DocumentBuilder()
    .addBearerAuth()
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
