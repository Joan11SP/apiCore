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
import { GetAccountsHandler } from './application/accounts/getAccountsHandler';
import { GetTransferHandler } from './application/transfer_history/getTransferHandler';
import { GetConsolidatedBalanceHandler } from './application/posicionConsolidada/getConsolidatedBalanceHandler';
import { GetBanksHandler } from './application/bankingentities/getbanksHandler';
import { GetTransferStatusHandler } from './application/getransferStatus/getransferStatus';
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
      GetAccountsHandler,
      GetTransferHandler,
      GetConsolidatedBalanceHandler,
      GetBanksHandler,
      GetTransferStatusHandler,

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
      private readonly GetMovementsHandler: GetMovementsHandler,
      private readonly GetAccountsHandler: GetAccountsHandler,
      private readonly GetTransferHandler: GetTransferHandler,
      private readonly GetConsolidatedBalanceHandler: GetConsolidatedBalanceHandler,
      private readonly GetBanksHandler: GetBanksHandler,
      private readonly GetTransferStatusHandler:GetTransferStatusHandler,
    )
  {
    this.serviceLocator.register('InternalTransactionHandler', this.InternalTransactionHandler);
    this.serviceLocator.register('GetCuentasDebitoHandler', this.GetCuentasDebitoHandler);
    this.serviceLocator.register('GetInfoSocioHandler', this.GetInfoSocioHandler);
    this.serviceLocator.register('GetPosicionConsolidadaHandler', this.GetPosicionConsolidadaHandler);
    this.serviceLocator.register('ValidateInternalAccountHandler', this.ValidateInternalAccountHandler);
    this.serviceLocator.register('GetMovementsHandler', this.GetMovementsHandler);
    this.serviceLocator.register('GetAccountsHandler', this.GetAccountsHandler);
    this.serviceLocator.register('GetTransferHandler', this.GetTransferHandler);
    this.serviceLocator.register('GetConsolidatedBalanceHandler', this.GetConsolidatedBalanceHandler);
    this.serviceLocator.register('GetBanksHandler', this.GetBanksHandler);
    this.serviceLocator.register('GetTransferStatusHandler', this.GetTransferStatusHandler);


  }

}
