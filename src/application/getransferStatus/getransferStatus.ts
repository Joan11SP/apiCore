import { Inject, Injectable } from "@nestjs/common";
import { GetStatusDto } from "./getStatusDto"
import { IRequestDB } from "src/application/common/database/IRequestDB";
import { GeneralResponse } from "src/application/common/Model/generalResponse";
import { MetodosGenericos } from "src/application/common/utils/metodos_genericos";

@Injectable()
export class GetTransferStatusHandler
{
    constructor
    (
    @Inject('IRequestDB') private readonly IRequestDB: IRequestDB,
    ) { }

    async handle(request: GetStatusDto)
    {
        let response = new GeneralResponse();
        try
        {
            response = await this.IRequestDB.getTransferStatus(request);
        }
        catch (error)
        {
            await MetodosGenericos.getTipoError(error, response, 0, GetTransferStatusHandler.name, request);
            response = MetodosGenericos.getArmarError(response);
        }
        return response;
    }

}