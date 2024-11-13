import { Inject, Injectable } from "@nestjs/common";
import { MetodosGenericos } from "../common/utils/metodos_genericos";
import { IRequestDB } from "../common/database/IRequestDB";
import { GeneralResponse } from "../common/Model/generalResponse";
import { GeneralRequest } from "../common/Model/generalRequest";

@Injectable()
export class GetCuentasDebitoHandler
{
    constructor
        (
            @Inject('IRequestDB') private readonly IRequestDB: IRequestDB
        ) { }

    async handle(request: GeneralRequest)
    {
        let response = new GeneralResponse();
        try
        {
            response = await this.IRequestDB.getDebitAccounts(request);
        }
        catch (error)
        {
            await MetodosGenericos.getTipoError(error, response, 0, GetCuentasDebitoHandler.name, request);
            response = MetodosGenericos.getArmarError(response);
        }
        return response;
    }

}