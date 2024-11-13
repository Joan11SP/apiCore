import { CallHandler, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, NestInterceptor, Scope } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { variables } from "src/json/configuracion.json";
import { ICipher } from "src/application/common/apis/ICipher";
import { Constantes } from "src/application/common/Model/constantes";

@Injectable({ scope: Scope.REQUEST })
export class EncryptionFilter implements NestInterceptor 
{
    constructor(@Inject('ICipher') private readonly ICipher: ICipher) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>
    {
        let response = next.handle().pipe(

            map(async (data) =>
            {
                // cifrar data
                if (variables.cifrado)
                {
                    let dataCipher = await this.ICipher.setCipherData(data, null);
                    data = { data: dataCipher };


                }

                return data;
            })

        );

        // descifrar data
        if (variables.cifrado)
        {
            try
            {
                const request:any = context.switchToHttp().getResponse<Request>();
                let dataDecipher:string = await this.ICipher.getDecipherData(request.req.body, request.req.headers);
                
                if(dataDecipher == Constantes.keyRedisNotFound)
                    throw new HttpException(dataDecipher, HttpStatus.CONFLICT);

                request.req.body = JSON.parse(dataDecipher);
            }
            catch (error)
            {
                throw new HttpException(error, HttpStatus.CONFLICT);
            }
        }

        return response;
    }
}