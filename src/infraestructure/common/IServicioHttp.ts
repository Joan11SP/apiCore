import { ServiceRequest } from "./servicesRequest";


export interface IServicioHttp
{
    solicitarServicio(solicitar: ServiceRequest) : Promise<any>;

}