import { IsString } from "class-validator";
import { GeneralRequest } from "src/application/common/Model/generalRequest";

export class ValidateInternalAccountDto extends GeneralRequest
{
    @IsString()
    numberAccount: string;
}