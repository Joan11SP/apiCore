
export class Constantes
{
    public static keyRedisNotFound: string = 'KEYS_NOT_FOUND';

    public static listServices: { name,url,headers,dataAdditional } [];
    
    /**
     * Obtener servicio la que debe redigir
     * @param name 
     * @returns 
     */
    static getServiceRedirect(name: string)
    {
        return this.listServices.find( e => e.name == name );
    }
}