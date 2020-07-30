import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RedisModule } from 'nestjs-redis';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BannerModule } from './banner/banner.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get('MONGODB_URI')}`,
        useNewUrlParser: true
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get('MONGODB_URI')}`,
        useNewUrlParser: true
      }),
      inject: [ConfigService]
    }),
    RedisModule.register({
      port: 6379,
      host: 'localhost',
    }),

    ScheduleModule.forRoot(),
    PostsModule,
    UsersModule,
    AuthModule,
    MailModule,
    TasksModule,
    BannerModule
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("*")
  }
}
