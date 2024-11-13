import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, Scope } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ICipher } from "src/application/common/apis/ICipher";

@Injectable({scope: Scope.REQUEST})
export class EncryptionFilterAes implements NestInterceptor 
{
    constructor(@Inject('ICipher') private readonly ICipher: ICipher){}

    async intercept(context: ExecutionContext, next: CallHandler ): Promise<Observable<any>>
    {
        const request:any = context.switchToHttp().getResponse<Request>(); 
        let response = next.handle().pipe(

            map(async (data)=>
            {
                // cifrar data
                let dataCipher = await this.ICipher.cipherDataAes(data);
                data = { data: dataCipher };
                
                return data;
            })
        );

        // descifrar data
             
        let cipher = this.getKeyAes(request.req.headers,request.req.body.data);
        let dataDecipher:string = await this.ICipher.decipherDataAes(cipher.data, cipher.key, request.req.headers.iv);
        request.req.body = JSON.parse(dataDecipher);
        
        return response;
    }

    private getKeyAes(headers:any, data:string)
    {
        let positionKey = JSON.parse(headers.position);
        
        positionKey = positionKey.reverse();
        let key = "";
        for (const element of positionKey)
        {
            let llaveAux = data.substring(element.pos+1, (element.pos+1) + element.length)
            data = data.replace(llaveAux,'')
            key = llaveAux + key
        }            
        return {data,key};

    }
}