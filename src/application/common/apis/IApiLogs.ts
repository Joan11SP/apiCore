
export interface IApiLogs
{
    addSolicitud(solicitar: any);
    addRespuesta(respuesta: any);
    addOtherCollection(solicitud: any, nameCollection: string);
}