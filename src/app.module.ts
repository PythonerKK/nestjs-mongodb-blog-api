import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RedisModule } from 'nestjs-redis';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://10.211.55.6/nest-blog-api", {
      useNewUrlParser: true
    }),
    RedisModule.register({
      port: 6379,
      host: 'localhost'
    }),
    PostsModule,
    UsersModule,
    AuthModule,
    MailModule]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("*")
  }
}
