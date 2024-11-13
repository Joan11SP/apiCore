import { IsNumber, IsString } from 'class-validator';

export class GeneralRequest
{
    @IsString()
    identificationNumber: string; //:string cedula, ente, other

    @IsString()
    ipPublic: string;

    @IsString()
    operativeSystem: string;

    @IsNumber()
    idPartner: number;
}
