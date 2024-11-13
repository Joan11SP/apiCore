import { IsNotEmpty, IsString,Length } from "class-validator";
import { GeneralRequest } from "src/application/common/Model/generalRequest";

export class GetMovementsDto extends GeneralRequest
{
    @IsString()
    @IsNotEmpty()
    accountNumber: string;
    
    @IsString()
    @IsNotEmpty()
    startDate: string;
    
    @IsString()
    @Length(0, 40)
    endDate: string;
    

}