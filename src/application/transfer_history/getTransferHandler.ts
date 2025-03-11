import { Inject, Injectable } from "@nestjs/common";
import { MetodosGenericos } from "../common/utils/metodos_genericos";
import { IRequestDB } from "../common/database/IRequestDB";
import { GeneralResponse } from "../common/Model/generalResponse";
import { GetTransferDto } from "../transfer_history/getTransferDto";
@Injectable()
export class GetTransferHandler {
    constructor(
        @Inject('IRequestDB') private readonly IRequestDB: IRequestDB
    ) { }

    async handle(request: GetTransferDto) {
        let response = new GeneralResponse();
        try {
            response = await this.IRequestDB.getTransfer(request);
        } catch (error) {
            await MetodosGenericos.getTipoError(error, response, 0, GetTransferHandler.name, request);
            response = MetodosGenericos.getArmarError(response);
        }
        return response;
    }
}
