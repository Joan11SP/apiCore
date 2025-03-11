import { Inject, Injectable } from "@nestjs/common";
import { MetodosGenericos } from "../common/utils/metodos_genericos";
import { IRequestDB } from "../common/database/IRequestDB";
import { GeneralResponse } from "../common/Model/generalResponse";

@Injectable()
export class GetBanksHandler {
    constructor(
        @Inject('IRequestDB') private readonly IRequestDB: IRequestDB
    ) { }

    async handle(request: any) {
        let response = new GeneralResponse();
        try {
            response = await this.IRequestDB.getBanks(request);
        } catch (error) {
            await MetodosGenericos.getTipoError(error, response, 0, GetBanksHandler.name, request);
            response = MetodosGenericos.getArmarError(response);
        }
        return response;
    }
}

