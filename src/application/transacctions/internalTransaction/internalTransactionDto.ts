import { IsNumber, IsString } from "class-validator";
import { GeneralRequest } from "src/application/common/Model/generalRequest";

export class InternalTransactionDto extends GeneralRequest
{
    @IsString()
    originAccountNumber: string;

    @IsString()
    destinationAccountNumber: string;

    @IsNumber()
    value: number;

    @IsString()
    observation: string;

    @IsString()
    idReference: string;

    @IsString()
    identificationBenef: string;

    @IsString()
    nameBenef: string;
}