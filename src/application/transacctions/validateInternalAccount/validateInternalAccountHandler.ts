import { Inject, Injectable } from "@nestjs/common";
import { GeneralResponse } from "src/application/common/Model/generalResponse";
import { ITransactionsDB } from "src/application/common/database/ITransactionsDB";
import { MetodosGenericos } from "src/application/common/utils/metodos_genericos";
import { ValidateInternalAccountDto } from "./validateInternalAccountDto";

@Injectable()
export class ValidateInternalAccountHandler
{
    constructor
        (
            @Inject('ITransactionsDB') private readonly ITransactionsDB: ITransactionsDB
        ) { }

    async handle(request: ValidateInternalAccountDto)
    {
        let response = new GeneralResponse();
        try
        {
            response = await this.ITransactionsDB.validateInternalAccount(request);
        }
        catch (error)
        {
            let getError = await MetodosGenericos.getTipoError(error, response, 0, ValidateInternalAccountHandler.name, request);
            response = MetodosGenericos.getArmarError(response);
        }
        return response;
    }

}