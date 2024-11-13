import { Inject, Injectable } from "@nestjs/common";
import { IRequestDB } from "../common/database/IRequestDB";
import { GeneralResponse } from "../common/Model/generalResponse";
import { MetodosGenericos } from "../common/utils/metodos_genericos";

@Injectable()
export class GetPosicionConsolidadaHandler
{
    constructor
        (
            @Inject('IRequestDB') private readonly IRequestDB: IRequestDB
        ) { }

    async handle(request: any)
    {
        let response = new GeneralResponse();
        try
        {
            response = await this.IRequestDB.getProducts(request);
        }
        catch (error)
        {
            await MetodosGenericos.getTipoError(error, response, 0, GetPosicionConsolidadaHandler.name, request);
            response = MetodosGenericos.getArmarError(response);
        }
        return response;
    }

}