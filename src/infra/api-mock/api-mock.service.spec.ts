// api-mock.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ApiMockService } from './api-mock.service';
import axios from 'axios';

// Mock do axios
jest.mock('axios');

describe('ApiMockService', () => {
  let service: ApiMockService;

  const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiMockService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:3000/users'),
          },
        },
      ],
    }).compile();

    service = module.get<ApiMockService>(ApiMockService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa mocks após cada teste
  });

  it('deve retornar uma lista de usuários', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          name: 'Alice Nascimento',
          email: 'alice.nascimento@niuco.com.br',
          last_activity: 1622499200,
          role: 'viewer',
          status: 'enabled',
        },
      ],
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const users = await service.getUsers();

    expect(users).toEqual(mockResponse.data);
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('Alice Nascimento');
  });

  it('deve retornar null em caso de erro', async () => {
    (axios.get as jest.Mock).mockRejectedValue(
      new Error('Erro na chamada da API'),
    );

    const result = await service.getUsers();

    expect(result).toBeNull();
    expect(consoleErrorMock).toHaveBeenCalled();
  });
});
