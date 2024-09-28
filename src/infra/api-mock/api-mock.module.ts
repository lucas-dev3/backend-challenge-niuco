import { Module } from "@nestjs/common";
import { ApiMockService } from "./api-mock.service";

@Module({
    providers: [ApiMockService],
    exports: [ApiMockService],
})
export class ApiMockModule {}