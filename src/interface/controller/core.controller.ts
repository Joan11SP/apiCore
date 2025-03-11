import { Body, Controller, Post, Headers } from '@nestjs/common';
import { MetodosGenericos } from 'src/application/common/utils/metodos_genericos';
import { ServiceLocator } from 'src/application/common/utils/serviceLocator';
import { AuthMetaData, SessionState } from '../Guard/authMetadata';
import { roles } from 'src/json/configuracion.json';
import { GetMovementsDto } from 'src/application/consolidatedPosition/getMovements/getMovementsDto';
import { GeneralRequest } from 'src/application/common/Model/generalRequest';
import { InternalTransactionDto } from 'src/application/transacctions/internalTransaction/internalTransactionDto';
import { ValidateInternalAccountDto } from 'src/application/transacctions/validateInternalAccount/validateInternalAccountDto';
import { GetAccountsDto } from 'src/application/accounts/getAccountsDto';
import { GetTransferDto } from 'src/application/transfer_history/getTransferDto';
import { GetBalanceDto } from 'src/application/posicionConsolidada/getBalanceDTO';
import { GetStatusDto } from 'src/application/getransferStatus/getStatusDto';

//@UsePipes(new ValidationPipe())
@Controller('/api/core')
export class CoreController {
  constructor(private readonly serviceLocator: ServiceLocator) {}

  @AuthMetaData(roles.usuarioAutenticado)
  @SessionState(roles.estadoAprobado)
  @Post('/getInfoSocio')
  async getInfoSocio(
    @Body() body: GeneralRequest,
    @Headers() headers,
  ): Promise<any> {
    body = await MetodosGenericos.getDatosSolicutd(
      'GET_INFO_SOCIO',
      headers,
      body,
    );
    return await this.serviceLocator
      .resolve('GetInfoSocioHandler')
      .handle(body);
  }

  @AuthMetaData(roles.usuarioAutenticado)
  @SessionState(roles.estadoAprobado)
  @Post('/getPosicionConsolidada')
  async getPosicionConsolidada(
    @Body() body: GeneralRequest,
    @Headers() headers,
  ): Promise<any> {
    body = await MetodosGenericos.getDatosSolicutd(
      'GET_POSICION_CONSOLIDADA',
      headers,
      body,
    );
    return await this.serviceLocator
      .resolve('GetPosicionConsolidadaHandler')
      .handle(body);
  }

  @AuthMetaData(roles.usuarioAutenticado)
  @SessionState(roles.estadoAprobado)
  @Post('/getCuentasDebito')
  async getCuentasDebito(
    @Body() body: GeneralRequest,
    @Headers() headers,
  ): Promise<any> {
    body = await MetodosGenericos.getDatosSolicutd(
      'GET_CUENTAS_DEBITO',
      headers,
      body,
    );
    return await this.serviceLocator
      .resolve('GetCuentasDebitoHandler')
      .handle(body);
  }

  @AuthMetaData(roles.usuarioAutenticado)
  @SessionState(roles.estadoAprobado)
  @Post('/getMovements')
  async getMovements(
    @Body() body: GetMovementsDto,
    @Headers() headers,
  ): Promise<any> {
    body = await MetodosGenericos.getDatosSolicutd(
      'GET_MOVIMIENTOS',
      headers,
      body,
    );
    return await this.serviceLocator
      .resolve('GetMovementsHandler')
      .handle(body);
  }

  @AuthMetaData(roles.usuarioAutenticado)
  @SessionState(roles.estadoAprobado)
  @Post('/getAccounts')
  async getAccounts(
    @Body() body: GetAccountsDto,
    @Headers() headers,
  ): Promise<any> {
    // Procesar datos de la solicitud con métodos genéricos
    body = await MetodosGenericos.getDatosSolicutd(
      'GET_CUENTAS',
      headers,
      body,
    );

    // Delegar la solicitud al handler correspondiente
    return await this.serviceLocator.resolve('GetAccountsHandler').handle(body);
  }

  @AuthMetaData(roles.usuarioAutenticado)
  @SessionState(roles.estadoAprobado)
  @Post('/getTransferHistory')
  async getTransferHistory(
    @Body() body: GetTransferDto,
    @Headers() headers,
  ): Promise<any> {
    // Procesar datos de la solicitud con métodos genéricos
    body = await MetodosGenericos.getDatosSolicutd(
      'GET_HISTORIAL_TRANSFERENCIAS',
      headers,
      body,
    );

    // Delegar la solicitud al handler correspondiente
    return await this.serviceLocator.resolve('GetTransferHandler').handle(body);
  }


  @AuthMetaData(roles.usuarioAutenticado)
  @SessionState(roles.estadoAprobado)
  @Post('/getBanks')
  async getBanks(
    @Body() body: GeneralRequest,
    @Headers() headers,
  ): Promise<any> {
    body = await MetodosGenericos.getDatosSolicutd('GET_BANKS', headers, body);
    return await this.serviceLocator.resolve('GetBanksHandler').handle(body);
  }

  //#region TRANSACTIONS

  @Post('/internalTransaction')
  async internalTransaction(
    @Body() body: InternalTransactionDto,
    @Headers() headers,
  ): Promise<any> {
    body = await MetodosGenericos.getDatosSolicutd(
      'INTERNAL_TRANSACTION',
      headers,
      body,
    );
    return await this.serviceLocator
      .resolve('InternalTransactionHandler')
      .handle(body);
  }

  @Post('/validateInternalAccount')
  async validateInternalAccount(
    @Body() body: ValidateInternalAccountDto,
    @Headers() headers,
  ): Promise<any> {
    body = await MetodosGenericos.getDatosSolicutd(
      'VALIDATE_INTERNAL_ACCOUNT',
      headers,
      body,
    );
    return await this.serviceLocator
      .resolve('ValidateInternalAccountHandler')
      .handle(body);
  }

  @AuthMetaData(roles.usuarioAutenticado)
  @SessionState(roles.estadoAprobado)
  @Post('/getConsolidatedBalance')
  async getConsolidatedBalance(
    @Body() body: GetBalanceDto,
    @Headers() headers,
  ): Promise<any> {
    // Procesar datos de la solicitud con métodos genéricos
    body = await MetodosGenericos.getDatosSolicutd(
      'GET_CONSOLIDATED_BALANCE',
      headers,
      body,
    );

    // Delegar la solicitud al handler correspondiente
    return await this.serviceLocator
      .resolve('GetConsolidatedBalanceHandler')
      .handle(body);
  }


  @AuthMetaData(roles.usuarioAutenticado)
  @SessionState(roles.estadoAprobado)
  @Post('/getTransferStatus')
  async getTransferStatus(
      @Body() body: GetStatusDto,
      @Headers() headers,
  ): Promise<any> {
      body = await MetodosGenericos.getDatosSolicutd('GET_TRANSFER_STATUS', headers, body);
      return await this.serviceLocator.resolve('GetTransferStatusHandler').handle(body);
  }

}
