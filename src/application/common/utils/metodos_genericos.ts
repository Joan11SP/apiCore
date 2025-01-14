import * as crypto from "crypto";
import { GeneralRequest } from "../Model/generalRequest";

export class MetodosGenericos
{
    public static getArmarError(respuesta): any
    {
        respuesta.info = "Se presentó una incidencia, intenta más tarde.";
        respuesta.code = "COD_ERROR_SERVICIO";
        respuesta.result = null;
        return respuesta;
    }

    public static addTipoError(error: any, tipo:string, nombre_recurso: string)
    {
        let armarErr = 
        {
            ex: error.toString(),
            tipo_ex: tipo,
            clase_ex:nombre_recurso
        }
        console.log(armarErr);
        
        return JSON.stringify(armarErr);
    }

    public static async getTipoError(error: any, respuesta: any, id_usuario: any, clase:string, solicitud:any = null)
    {
        let message:string = error.message;
        
        if(message.indexOf('tipo_ex') == -1)
            message = this.addTipoError(message, "CODIGO", clase);
        
            
        let getError = JSON.parse(message);

        let armarErr = 
        {
            idInstitution: solicitud.idInstitution,
            idSolution: solicitud.idSolution,
            idUser: solicitud.idUser,
            idRequest: solicitud.idRequest,
            processDate : this.getFechaActual(),
            sender: solicitud.sender,
            login: solicitud.login,
            error: getError
        }

        return armarErr;

    }

    // obtener fecha actual
    public static getFechaActual(): string
    {
        let fecha_proceso = new Date();
        const optionsToFormat: any =
        {
            year: 'numeric', // año en formato numérico
            month: '2-digit', // mes en formato numérico de 2 dígitos
            day: '2-digit', // día en formato numérico de 2 dígitos
        };

        return fecha_proceso.toLocaleDateString('en-us', optionsToFormat) + " " + fecha_proceso.toLocaleTimeString();
    }   

    // obtener un id único
    public static getIdRSolicitud(idrequest:string)
    {
        if (idrequest != undefined && idrequest.trim() != '') return idrequest;
        return crypto.randomUUID()
    }

    public static async getDatosSolicutd(req:any, headers:any, body:any)
    {
        body.idRequest = this.getIdRSolicitud(headers['idrequest']);
        body.processDate = this.getFechaActual();
        body.process = body.process ?? req;
        return body;
    }

    public static async getDatosRespuesta(solicitud:any, respuesta:any)
    {
        respuesta.idRequest = solicitud.idRequest;
        respuesta.idInstitution = solicitud.idInstitution;
        respuesta.idSolution = solicitud.idSolution;
        respuesta.idUser = solicitud.idUser;
        respuesta.processDate = this.getFechaActual();
        respuesta.sender = solicitud.sender;
        respuesta.process = solicitud.process;
        respuesta.login = solicitud.login;
        return respuesta;
    }  

    getDatosAuditoria = async (solicitud: GeneralRequest, auditoria: any) => 
    {
        return { solicitud, auditoria };
    }

    public static getDateNotification()
    {
        let dateProcess = new Date();
        let optionsToFormat:any =
        {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        
        let date = dateProcess.toLocaleDateString('en-GB', optionsToFormat)
        let hour = dateProcess.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})  

        let response = { date, hour, dateHour: date + ' ' + hour }        
        return response;
    }
}