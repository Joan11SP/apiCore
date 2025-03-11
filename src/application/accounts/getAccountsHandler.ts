import { Inject, Injectable } from "@nestjs/common";
import { MetodosGenericos } from "../common/utils/metodos_genericos";
import { IRequestDB } from "../common/database/IRequestDB";
import { GeneralResponse } from "../common/Model/generalResponse";
import { GetAccountsDto } from "../accounts/getAccountsDto";
@Injectable()
export class GetAccountsHandler {
    constructor(
        @Inject('IRequestDB') private readonly IRequestDB: IRequestDB
    ) { }

    async handle(request: GetAccountsDto) {
        let response = new GeneralResponse();
        try {
            // Llamada al método correspondiente para obtener los clientes registrados
            response = await this.IRequestDB.getAccountByCedulaOrNumeroCuenta(request);
        } catch (error) {
            // Manejo de errores utilizando métodos genéricos
            await MetodosGenericos.getTipoError(error, response, 0, GetAccountsHandler.name, request);
            response = MetodosGenericos.getArmarError(response);
        }
        return response;
    }
}
