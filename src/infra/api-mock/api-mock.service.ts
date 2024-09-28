import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class ApiMockService {
    constructor(
        private readonly _configService: ConfigService,
    ) {}

    async getUsers() {
        return await axios.get(`${this._configService.get('app.apiMockUrl')}/users`)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            return null;
        });
    }
}