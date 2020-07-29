import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { RedisModule } from 'nestjs-redis';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from './post.model';

describe('Posts Controller', () => {
  let controller: PostsController;

  const mockMongooseTokens = [
    {
      provide: getModelToken('Post'),
      useValue: {Post},
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      imports: [
        RedisModule.register({
          port: 6379,
          host: 'localhost'
        })
      ],
      providers: [...mockMongooseTokens, PostsService]
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('list', () => {
  //   it('返回所有文章列表', async () => {
  //     const result = ['test'];
  //     jest.spyOn(service, 'list').mockImplementation(() => result)
  //     expect(await controller.index()).toBe(result)
  //   })
  // })
});
