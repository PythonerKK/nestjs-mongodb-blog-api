import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Post } from './post.model';
import { RedisModule } from 'nestjs-redis';
import { getModelToken } from '@nestjs/mongoose';

describe('PostsService', () => {
  let service: PostsService;

  const mockMongooseTokens = [
    {
      provide: getModelToken('Post'),
      useValue: {Post},
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...mockMongooseTokens,
        PostsService
      ],
      imports: [
        RedisModule.register({
          port: 6379,
          host: 'localhost'
        })
      ],
    })
      .compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should 返回文章列表', () => {
  //   expect(service.list({}, {})).resolves
  // });
});
