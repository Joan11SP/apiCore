import { GetMovementsDto } from "src/application/consolidatedPosition/getMovements/getMovementsDto";
import { GeneralRequest } from "../Model/generalRequest";
import { GeneralResponse } from "../Model/generalResponse";

export interface IRequestDB
{
    getDataSocio(req: GeneralRequest): Promise<any>;
    getDebitAccounts(request: GeneralRequest): Promise<GeneralResponse>;
    getProducts(request: GeneralRequest): Promise<GeneralResponse>;
    getMovements(request: GetMovementsDto): Promise<GeneralResponse>;
}