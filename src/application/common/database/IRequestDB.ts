import { GetMovementsDto } from 'src/application/consolidatedPosition/getMovements/getMovementsDto'
import { GeneralRequest } from '../Model/generalRequest'
import { GeneralResponse } from '../Model/generalResponse'
import { GetAccountsDto } from 'src/application/accounts/getAccountsDto';
import { GetTransferDto } from 'src/application/transfer_history/getTransferDto';
import { GetBalanceDto } from 'src/application/posicionConsolidada/getBalanceDTO';
import { GetStatusDto } from "src/application/getransferStatus/getStatusDto"

export interface IRequestDB{
    getDataSocio(req: GeneralRequest): Promise<any>;
    getDebitAccounts(request: GeneralRequest): Promise<GeneralResponse>;
    getProducts(request: GeneralRequest): Promise<GeneralResponse>;
    getMovements(request: GetMovementsDto): Promise<GeneralResponse>;
    getAccountByCedulaOrNumeroCuenta(request: GetAccountsDto): Promise<GeneralResponse>;
    getTransfer(request: GetTransferDto): Promise<GeneralResponse>;
    getConsolidatedBalance(request: GetBalanceDto): Promise<GeneralResponse>;
    getBanks(request: GeneralRequest): Promise<GeneralResponse>;
    getTransferStatus(request:GetStatusDto):Promise<GeneralResponse>;
}