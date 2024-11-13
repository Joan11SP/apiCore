import { Inject, Injectable } from "@nestjs/common";
import { GetMovementsDto } from "./getMovementsDto"
import { IRequestDB } from "src/application/common/database/IRequestDB";
import { GeneralResponse } from "src/application/common/Model/generalResponse";
import { MetodosGenericos } from "src/application/common/utils/metodos_genericos";

@Injectable()
export class GetMovementsHandler
{
    constructor
    (
            @Inject('IRequestDB') private readonly IRequestDB: IRequestDB,
    ) { }

    async handle(request: GetMovementsDto)
    {
        let response = new GeneralResponse();
        try
        {
            response = await this.IRequestDB.getMovements(request);
        }
        catch (error)
        {
            await MetodosGenericos.getTipoError(error, response, 0, GetMovementsHandler.name, request);
            response = MetodosGenericos.getArmarError(response);
        }
        return response;
    }

}