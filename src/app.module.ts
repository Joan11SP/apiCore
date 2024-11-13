import { Module } from '@nestjs/common';
import { ServiceLocator } from './application/common/utils/serviceLocator';
import { GetCuentasDebitoHandler } from './application/getCuentasDebito/getCuentasDebitoHandler';
import { RequestDB } from './infraestructure/database/requestDB';
import { ConnectionDB } from './infraestructure/database/ConnectionDB';
import { TransactionsDB } from './infraestructure/database/transactionsDB';
import { InternalTransactionHandler } from './application/transacctions/internalTransaction/internalTransactionHandler';
import { CoreController } from './interface/controller/core.controller';
import { GetInfoSocioHandler } from './application/consolidatedPosition/infoSocio/getInfoSocioHandler';
import { GetPosicionConsolidadaHandler } from './application/posicionConsolidada/getPosicionConsolidadaHandler';
import { ValidateInternalAccountHandler } from './application/transacctions/validateInternalAccount/validateInternalAccountHandler';
import { GetMovementsHandler } from './application/consolidatedPosition/getMovements/getMovementsHandler';

@Module({
  imports: [],
  providers:
    [
      ServiceLocator,
      InternalTransactionHandler,
      GetCuentasDebitoHandler,
      GetInfoSocioHandler,
      GetPosicionConsolidadaHandler,
      ValidateInternalAccountHandler,
      GetMovementsHandler,

      { provide: 'ConnectionDB', useClass: ConnectionDB },
      { provide: 'ITransactionsDB', useClass: TransactionsDB},
      { provide: 'IRequestDB', useClass: RequestDB },
      
    ],
  controllers: [CoreController]
})

export class AppModule
{

  constructor
    (
      private readonly serviceLocator: ServiceLocator,
      private readonly InternalTransactionHandler: InternalTransactionHandler,
      private readonly GetCuentasDebitoHandler: GetCuentasDebitoHandler,
      private readonly GetInfoSocioHandler: GetInfoSocioHandler,
      private readonly GetPosicionConsolidadaHandler: GetPosicionConsolidadaHandler,
      private readonly ValidateInternalAccountHandler: ValidateInternalAccountHandler,
      private readonly GetMovementsHandler: GetMovementsHandler
    )
  {
    this.serviceLocator.register('InternalTransactionHandler', this.InternalTransactionHandler);
    this.serviceLocator.register('GetCuentasDebitoHandler', this.GetCuentasDebitoHandler);
    this.serviceLocator.register('GetInfoSocioHandler', this.GetInfoSocioHandler);
    this.serviceLocator.register('GetPosicionConsolidadaHandler', this.GetPosicionConsolidadaHandler);
    this.serviceLocator.register('ValidateInternalAccountHandler', this.ValidateInternalAccountHandler);
    this.serviceLocator.register('GetMovementsHandler', this.GetMovementsHandler);
  }

}
