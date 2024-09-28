import { Test, TestingModule } from '@nestjs/testing';
import { FindUsersService } from "../services/find-users.service";
import { UsersController } from "./users.controller";


describe('UsersController', () => {
  let usersController: UsersController;
  let findUsersService: FindUsersService;

  const mockUsers = [
    {
      id: '1',
      name: 'Alice Nascimento',
      email: 'alice.nascimento@niuco.com.br',
      lastAccess: '1970-01-19T18:41:39.200Z',
      isPaying: false,
      isActive: true,
    },
    {
      id: '2',
      name: 'Bruno Silva',
      email: 'bruno.silva@niuco.com.br',
      lastAccess: '1970-01-19T18:43:05.600Z',
      isPaying: true,
      isActive: true,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: FindUsersService,
          useValue: {
            execute: jest.fn().mockResolvedValue(mockUsers), // Mock do retorno
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    findUsersService = module.get<FindUsersService>(FindUsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should return an array of users with correct structure', async () => {
    const result = await usersController.getUsers();
    expect(result).toEqual(mockUsers); // Verifica se o retorno é o mock definido
    expect(findUsersService.execute).toHaveBeenCalled(); // Verifica se o método foi chamado
  });

  it('should return an empty array when no users are found', async () => {
    jest.spyOn(findUsersService, 'execute').mockResolvedValueOnce([]);
    
    const result = await usersController.getUsers();
    expect(result).toEqual([]);
    expect(findUsersService.execute).toHaveBeenCalled();
  });
  
  it('should throw an error if FindUsersService fails', async () => {
    const error = new Error('Service failure');
    jest.spyOn(findUsersService, 'execute').mockRejectedValueOnce(error);
    
    await expect(usersController.getUsers()).rejects.toThrow('Service failure');
    expect(findUsersService.execute).toHaveBeenCalled();
  });
  
});
