import { IsNotEmpty, IsString,Length } from "class-validator";
import { GeneralRequest } from "src/application/common/Model/generalRequest";

export class GetStatusDto extends GeneralRequest
{
    @IsString()
    @IsNotEmpty()
    reference: string;
    
    @IsString()
    @IsNotEmpty()
    startDate: string;
    
    @IsString()
    @Length(0, 40)
    endDate: string;
    

}