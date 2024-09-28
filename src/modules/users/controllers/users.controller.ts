import { Controller, Get } from '@nestjs/common';
import { FindUsersService } from '../services/find-users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly _findUsersService: FindUsersService) {}

  @Get()
  async getUsers() {
    return await this._findUsersService.execute();
  }
}
