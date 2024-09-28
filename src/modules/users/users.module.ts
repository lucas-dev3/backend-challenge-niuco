import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { FindUsersService } from "./services/find-users.service";
import { ApiMockModule } from "src/infra/api-mock/api-mock.module";

@Module({
    imports: [ApiMockModule],
    controllers: [UsersController],
    providers: [FindUsersService],
    exports: [FindUsersService],
})
export class UsersModule {}