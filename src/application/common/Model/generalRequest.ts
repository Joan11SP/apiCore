import { IsNumber, IsString, IsNotEmpty,Length } from 'class-validator';
export class GeneralRequest
{
    @IsString()
    identificationNumber: string; //:string cedula, ente, otro

    @IsString()
    ipPublic: string;

    @IsString()
    operativeSystem: string;

    @IsNumber()
    idPartner: number;

    @IsString()
    accountNumber: string;

    @IsString()
    @IsNotEmpty()
    startDate: string;
        
    @IsString()
    @Length(0, 40)
    endDate: string;
    
}
