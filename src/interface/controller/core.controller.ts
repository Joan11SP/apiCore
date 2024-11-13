import { Body, Controller, Post, Headers } from "@nestjs/common";
import { MetodosGenericos } from "src/application/common/utils/metodos_genericos";
import { ServiceLocator } from "src/application/common/utils/serviceLocator";
import { AuthMetaData, SessionState } from '../Guard/authMetadata';
import { roles } from "src/json/configuracion.json";
import { GetMovementsDto } from "src/application/consolidatedPosition/getMovements/getMovementsDto";
import { GeneralRequest } from "src/application/common/Model/generalRequest";
import { InternalTransactionDto } from "src/application/transacctions/internalTransaction/internalTransactionDto";
import { ValidateInternalAccountDto } from "src/application/transacctions/validateInternalAccount/validateInternalAccountDto";


//@UsePipes(new ValidationPipe())
@Controller('/api/core')
export class CoreController
{

    constructor(private readonly serviceLocator: ServiceLocator) { }

    @AuthMetaData(roles.usuarioAutenticado)
    @SessionState(roles.estadoAprobado)
    @Post('/getInfoSocio')
    async getInfoSocio(@Body() body: GeneralRequest, @Headers() headers): Promise<any>
    {
        body = await MetodosGenericos.getDatosSolicutd('GET_INFO_SOCIO', headers, body);
        return await this.serviceLocator.resolve('GetInfoSocioHandler').handle(body);

    }

    @AuthMetaData(roles.usuarioAutenticado)
    @SessionState(roles.estadoAprobado)
    @Post('/getPosicionConsolidada')
    async getPosicionConsolidada(@Body() body: GeneralRequest, @Headers() headers): Promise<any>
    {
        body = await MetodosGenericos.getDatosSolicutd('GET_POSICION_CONSOLIDADA', headers, body);
        return await this.serviceLocator.resolve('GetPosicionConsolidadaHandler').handle(body);

    }

    @AuthMetaData(roles.usuarioAutenticado)
    @SessionState(roles.estadoAprobado)
    @Post('/getCuentasDebito')
    async getCuentasDebito(@Body() body: GeneralRequest, @Headers() headers): Promise<any>
    {
        body = await MetodosGenericos.getDatosSolicutd('GET_CUENTAS_DEBITO', headers, body);
        return await this.serviceLocator.resolve('GetCuentasDebitoHandler').handle(body);

    }

    @AuthMetaData(roles.usuarioAutenticado)
    @SessionState(roles.estadoAprobado)
    @Post('/getMovements')
    async getMovements(@Body() body: GetMovementsDto, @Headers() headers): Promise<any>
    {
        body = await MetodosGenericos.getDatosSolicutd('GET_MOVIMIENTOS', headers, body);
        return await this.serviceLocator.resolve('GetMovementsHandler').handle(body);

    }

    //#region TRANSACTIONS

    @Post('/internalTransaction')
    async internalTransaction(@Body() body: InternalTransactionDto, @Headers() headers): Promise<any>
    {
        body = await MetodosGenericos.getDatosSolicutd('INTERNAL_TRANSACTION', headers, body);
        return await this.serviceLocator.resolve('InternalTransactionHandler').handle(body);
    }

    @Post('/validateInternalAccount')
    async validateInternalAccount(@Body() body: ValidateInternalAccountDto, @Headers() headers): Promise<any>
    {
        body = await MetodosGenericos.getDatosSolicutd('VALIDATE_INTERNAL_ACCOUNT', headers, body);
        return await this.serviceLocator.resolve('ValidateInternalAccountHandler').handle(body);
    }

    //#endregion

}


