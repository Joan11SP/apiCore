import { Inject, Injectable } from "@nestjs/common";
import { InternalTransactionDto } from "./internalTransactionDto";
import { GeneralResponse } from "src/application/common/Model/generalResponse";
import { ITransactionsDB } from "src/application/common/database/ITransactionsDB";
import { MetodosGenericos } from "src/application/common/utils/metodos_genericos";

@Injectable()
export class InternalTransactionHandler
{
    constructor
        (
            @Inject('ITransactionsDB') private readonly ITransactionsDB: ITransactionsDB
        ) { }

    async handle(request: InternalTransactionDto)
    {
        let response = new GeneralResponse();
        try
        {
            response = await this.ITransactionsDB.addInternalTransaction(request);
        }
        catch (error)
        {
            let getError = await MetodosGenericos.getTipoError(error, response, 0, "InternalTransactionHandler", request);
            response = MetodosGenericos.getArmarError(response);
        }
        return response;
    }

}