import { InternalTransactionDto } from "src/application/transacctions/internalTransaction/internalTransactionDto";
import { GeneralResponse } from "../Model/generalResponse";
import { ValidateInternalAccountDto } from "src/application/transacctions/validateInternalAccount/validateInternalAccountDto";

export interface ITransactionsDB
{
    addInternalTransaction(request: InternalTransactionDto): Promise<GeneralResponse>;
    validateInternalAccount(request: ValidateInternalAccountDto): Promise<GeneralResponse>;
}