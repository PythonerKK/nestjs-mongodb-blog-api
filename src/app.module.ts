import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://10.211.55.6/nest-blog-api", {
      useNewUrlParser: true
    }),
    PostsModule,
    UsersModule,
    AuthModule]
  // controllers: [UsersController]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("*")
  }
}
