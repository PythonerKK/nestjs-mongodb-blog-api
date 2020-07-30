import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionFilter } from './filter/any-exception.filter';

import * as helmet from 'helmet'
import * as csurf from 'csurf'
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import { BannerModule } from './banner/banner.module';

declare const module: any;

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

  // 安全
  app.use(helmet())

  // 跨域
  app.enableCors()

  // 启动gzip压缩
  app.use(compression())

  // csrf
  // app.use(csurf())

  // 接口限速
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100000, // limit each IP to 100 requests per windowMs
    }),
  );

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("nest博客api")
    .setDescription("第一个nest项目")
    .setVersion("1.0")
    .addTag("nest+mongodb+redis博客API接口")
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("api-docs", app, document)

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  

  await app.listen(3000);
}
bootstrap();
