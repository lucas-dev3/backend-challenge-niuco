import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FindUsersService } from './find-users.service';
import { ApiMockService } from 'src/infra/api-mock/api-mock.service';
import { Users } from '../entities/users.entity';

describe('FindUsersService', () => {
  let findUsersService: FindUsersService;
  let apiMockService: ApiMockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUsersService,
        {
          provide: ApiMockService,
          useValue: {
            getUsers: jest.fn(),
          },
        },
      ],
    }).compile();

    findUsersService = module.get<FindUsersService>(FindUsersService);
    apiMockService = module.get<ApiMockService>(ApiMockService);
  });

  it('should return mapped users when ApiMockService returns valid users', async () => {
    const mockUsers = [
      {
        id: "1",
        name: "Alice Nascimento",
        email: "alice.nascimento@niuco.com.br",
        last_activity: 1622499200, // timestamp
        role: "viewer",
        status: "enabled"
      },
      {
        id: "2",
        name: "Bob Silva",
        email: "bob.silva@niuco.com.br",
        last_activity: 1622585600, // timestamp
        role: "editor",
        status: "enabled"
      },
    ];

    apiMockService.getUsers = jest.fn().mockResolvedValue(mockUsers);

    const result = await findUsersService.execute();

    expect(result).toEqual([
      new Users("1", "Alice Nascimento", "alice.nascimento@niuco.com.br", 1622499200 , false, true),
      new Users("2", "Bob Silva", "bob.silva@niuco.com.br", 1622585600, true, true),
    ]);
    expect(apiMockService.getUsers).toHaveBeenCalled();
  });

  it('should throw internal server error if ApiMockService throws an unexpected error', async () => {
    apiMockService.getUsers = jest.fn().mockRejectedValue(new Error('Unexpected error'));

    await expect(findUsersService.execute()).rejects.toThrow(
      'Error to get users from api mock'
    );
  });

  it('should propagate HttpException if ApiMockService throws HttpException', async () => {
    const httpException = new HttpException('API Mock error', HttpStatus.BAD_REQUEST);
    apiMockService.getUsers = jest.fn().mockRejectedValue(httpException);

    await expect(findUsersService.execute()).rejects.toThrow('API Mock error');
  });

  it('should throw an HttpException if the result is not an array', async () => {
    apiMockService.getUsers = jest.fn().mockResolvedValue({});

    await expect(findUsersService.execute()).rejects.toThrow(
      'Error to get users'
    );
  });
});
