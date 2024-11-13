import { Inject, Injectable } from "@nestjs/common";
import { GeneralResponse } from "src/application/common/Model/generalResponse";

import { IRequestDB } from "src/application/common/database/IRequestDB";
import { MetodosGenericos } from "src/application/common/utils/metodos_genericos";

@Injectable()
export class GetInfoSocioHandler
{
    constructor
    (
            @Inject('IRequestDB') private readonly IRequestDB: IRequestDB,
    ) { }

    async handle(request: any)
    {
        let response = new GeneralResponse();
        try
        {
            response = await this.IRequestDB.getDataSocio(request);
        }
        catch (error)
        {
            await MetodosGenericos.getTipoError(error, response, 0, GetInfoSocioHandler.name, request);
            response = MetodosGenericos.getArmarError(response);
        }
        return response;
    }

}