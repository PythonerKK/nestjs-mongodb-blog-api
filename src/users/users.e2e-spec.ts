import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './users.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { getModelToken } from '@nestjs/mongoose';

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;
  const mockMongooseTokens = [
    {
      provide: getModelToken('User'),
      useValue: {User},
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [...mockMongooseTokens, UsersService, AuthService, LocalStrategy, JwtStrategy],
      imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '8h' }
        }),
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
