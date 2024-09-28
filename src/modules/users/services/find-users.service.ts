import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ApiMockService } from 'src/infra/api-mock/api-mock.service';
import { Users } from '../entities/users.entity';

@Injectable()
export class FindUsersService {
  constructor(
    private readonly _apiMockService: ApiMockService,
  ) {}

  async execute() {
    try {
      const usersApiMock = await this._apiMockService.getUsers();

      if (!Array.isArray(usersApiMock)) {
        throw new HttpException('Error to get users', HttpStatus.BAD_REQUEST);
      }

      const usersMapped = usersApiMock.map((user) => {
        const rolePaying = ['editor', 'admin'];

        const isPaying =
          rolePaying.includes(user.role) && user.status === 'enabled';

        const isActive = user.status === 'enabled';

        return new Users(
          user.id,
          user.name,
          user.email,
          user.last_activity,
          isPaying,
          isActive,
        );
      });

      return usersMapped;
    } catch (error) {
      new Logger().error(error);

      if(error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Error to get users from api mock', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
