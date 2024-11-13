import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject, Injectable, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { IApiLogs } from "src/application/common/apis/IApiLogs";
import { Constantes } from 'src/application/common/Model/constantes';
import { MetodosGenericos } from 'src/application/common/utils/metodos_genericos';

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter 
{
  constructor(@Inject('IApiLogs') private readonly IApiLogs: IApiLogs) { }
  catch(exception: HttpException, host: ArgumentsHost) 
  {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = exception.getStatus();

    // Aquí puedes personalizar la respuesta de acuerdo al tipo de excepción
    let error =
    {
      info: "Error en el servicio, intenta más tarde.",
      code: "COD_ERROR_HTTP",
    }

    if(exception.message != Constantes.keyRedisNotFound)
    {
      let saveError = 
      {
        ex: exception.stack.split("\n"),
        exMessage: exception,
        class: 'HttpExceptionFilter',
        dateProcess: MetodosGenericos.getFechaActual()
      }
      this.IApiLogs.addOtherCollection(saveError, "errores");
      console.log(exception);      
    }

    if (status == HttpStatus.CONFLICT) error.code = 'COD_ERR_SINCRONIZATION';
    
    response.status(status).json(error);
  }
}