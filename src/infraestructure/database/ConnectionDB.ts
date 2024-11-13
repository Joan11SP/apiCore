import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { Parametro } from '../common/parametro';

@Injectable()
export class ConnectionDB
{
    private pool: mysql.Pool;
    public parametros: Parametro[];

    constructor()
    {
        this.connect();
    }

    private async connect()
    {
        if (this.pool != null) return;

        try
        {
            this.pool = mysql.createPool(
                {
                    user: "root",
                    host: "localhost",
                    database: "core",
                    password: "bruja12345",
                    port: 3600,
                    connectionLimit: 50,
                    multipleStatements: true
                }
            );
            console.log('Connected to DB');
        }
        catch (error)
        {
            console.log(`DB ${error}`);

        }

    }

    //* Obtener la conexion actual activa
    async getConnection()
    {
        return this.pool.getConnection();
    }

    //* Obtener resultado en formato json, de un insert, update o delete

    static async getResultDB(rows: any)
    {
        let data_string = JSON.stringify(rows);

        return JSON.parse(data_string);
    }

    //* Obtener parametros cargados en memoria

    getParametrosUnico(busqueda: string): Parametro
    {
        return this.parametros.find(e => e.nom_unico == busqueda);
    }

    getParametrosGrupo(busqueda: string): Parametro[]
    {
        return this.parametros.filter(e => e.nom_grupo == busqueda);
    }

    getParametrosPorValor(busqueda: string, servicio_id: number = null, tipo_valor: string = 'valor')
    {
        if (servicio_id == null)
            return this.parametros.find(e => e[tipo_valor] == busqueda);

        return this.parametros.find(e => e[tipo_valor] == busqueda && e.servicio_id == servicio_id);
    }
}