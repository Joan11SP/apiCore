import { Parametro } from "src/infraestructure/common/parametro";

export interface IRedis
{
    getData (key:string);
    addData (key:string, data:any, isString: boolean, timeLife: number);
    addParameters (parameters: Array<Parametro>)
}