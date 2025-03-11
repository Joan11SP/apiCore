import { Inject, Injectable } from "@nestjs/common";
import { MetodosGenericos } from "../common/utils/metodos_genericos";
import { IRequestDB } from "../common/database/IRequestDB";
import { GeneralResponse } from "../common/Model/generalResponse";
import { GetBalanceDto } from "./getBalanceDTO";
@Injectable()
export class GetConsolidatedBalanceHandler
{
    constructor
        (
            @Inject('IRequestDB') private readonly IRequestDB: IRequestDB
        ) { }

    async handle(request: GetBalanceDto)
    {
        let response = new GeneralResponse();
        try
        {
            response = await this.IRequestDB.getConsolidatedBalance(request);
        }
        catch (error)
        {
            await MetodosGenericos.getTipoError(error, response, 0, GetConsolidatedBalanceHandler.name, request);
            response = MetodosGenericos.getArmarError(response);
        }
        return response;
    }

}