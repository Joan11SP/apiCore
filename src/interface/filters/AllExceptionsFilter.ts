import { ExceptionFilter, Catch, ArgumentsHost, Injectable, Inject, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { IApiLogs } from "src/application/common/apis/IApiLogs";
import { MetodosGenericos } from 'src/application/common/utils/metodos_genericos';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter
{

  constructor(@Inject('IApiLogs') private readonly IApiLogs: IApiLogs) { }

  catch(exception: any, host: ArgumentsHost) 
  {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = response.statusCode;
    // Aquí puedes personalizar la respuesta de acuerdo al tipo de excepción
    let error =
    {
      info: "Ocurrió un error, intenta más tarde.",
      code: "COD_ERROR_SERVICIO",
    }
    let saveError = 
    { 
      ex: exception.stack.split("\n"),
      exMessage: exception,
      class: 'AllExceptionsFilter',
      dateProcess: MetodosGenericos.getFechaActual()
    }
    console.log(exception);    
    
    this.IApiLogs.addOtherCollection(saveError, "errores");
    if (status == HttpStatus.CONFLICT) error.code = 'COD_ERR_SINCRONIZATION';
    response.status(status).json(error);
  }
}


