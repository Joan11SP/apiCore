import { Inject, Injectable } from "@nestjs/common";
import { IRequestDB } from "src/application/common/database/IRequestDB";
import { MetodosGenericos } from "src/application/common/utils/metodos_genericos";
import { ConnectionDB } from "./ConnectionDB";
import { PoolConnection } from "mysql2/promise";
import { GeneralResponse } from "src/application/common/Model/generalResponse";
import { GeneralRequest } from "src/application/common/Model/generalRequest";
import { GetMovementsDto } from "src/application/consolidatedPosition/getMovements/getMovementsDto";

@Injectable()
export class RequestDB implements IRequestDB
{
    private readonly nameClass = RequestDB.name;
    constructor(@Inject('ConnectionDB') private readonly db: ConnectionDB){}

    /**
     * Obtener información del usuario
     * @param request 
     * @returns 
     */
    async getDataSocio(request: GeneralRequest): Promise<GeneralResponse>
    {
        let client: PoolConnection;
        let response = new GeneralResponse();
        const sqlGetUser = `select idPartner, identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate from core.partners where identification = ?;`;
        try
        {
            client = await this.db.getConnection();
            const rows: any[] = await client.query(sqlGetUser, [request.identificationNumber]);
            response.result = rows[0][0];

            if(response.result == null)
            {
                response.code = '404';
                response.info = 'No se encontró información.'
            }

            client.release();
        }
        catch (error)
        {
            client.release();
            let getError = MetodosGenericos.addTipoError(error.toString(), "Base", this.nameClass + ".getDataSocio");
            throw new Error(getError);
        }
        return response;
    }

    /**
     * Obtener cuentas de debito
     * @param request 
     * @returns 
     */
    async getDebitAccounts(request: GeneralRequest): Promise<GeneralResponse>
    {
        let client: PoolConnection;
        let response = new GeneralResponse();
        const sqlGetAccounts = `select
                            numAccount,
                            typeAccount,
                            case when acceptDebit = 1 then 1 else 0 end as acceptDebit,
                            case when acceptCredit = 1 then 1 else 0 end as acceptCredit,
                            availableBalance,
                            blockedBalance,
                            concat(names, ' ', lastName, ' ', mothersLastName) as names, email
                            from core.accounts join partners p on idPartner = partnerId and identification = ? and acceptDebit = 1 and status = 'A'`;
        try
        {
            client = await this.db.getConnection();
            const rows: any[] = await client.query(sqlGetAccounts, [request.identificationNumber]);
            response.result = rows[0];

            if(response.result[0] == null)
            {
                response.code = '404';
                response.info = 'No se encontró información.'
            }

            client.release();
        }
        catch (error)
        {
            client.release();
            let getError = MetodosGenericos.addTipoError(error.toString(), "Base", this.nameClass + ".getDebitAccounts");
            throw new Error(getError);
        }
        return response;
    }

    /**
     * Obtener productos del socio
     * @param request 
     * @returns 
     */
    async getProducts(request: GeneralRequest): Promise<GeneralResponse>
    {
        let client: PoolConnection;
        let response = new GeneralResponse();
        const sqlGetAccounts = `select numAccount, 
                                    typeAccount, case typeAccount when 1 then 'Ahorros' else 'Otros' end as description,
                                    case when acceptDebit = 1 then 1 else 0 end as acceptDebit,
                                    case when acceptCredit = 1 then 1 else 0 end as acceptCredit,
                                    availableBalance, blockedBalance, lastMovement
                                from core.accounts where partnerId = ? and status = 'A'`;
        try
        {
            client = await this.db.getConnection();
            const rows: any[] = await client.query(sqlGetAccounts, [request.idPartner]);
            response.result = { saving: rows[0], credits: [], investments: [] }

            if(response.result.saving[0] == null)
            {
                response.code = '404';
                response.info = 'No se encontró información.'
            }

            client.release();
        }
        catch (error)
        {
            client.release();
            let getError = MetodosGenericos.addTipoError(error.toString(), "Base", this.nameClass + ".getDebitAccounts");
            throw new Error(getError);
        }
        return response;
    }

    /**
     * Obtener movimientos de una cuenta
     * @param request 
     * @returns 
     */
    async getMovements(request: GetMovementsDto): Promise<GeneralResponse>
    {
        let client: PoolConnection;
        let response = new GeneralResponse();
        const sqlGetMovements = `select sign, value, balance, observation, reference, typeTransaction, idTransaction, date_format(createAt, "%Y-%m-%d %T") date from core.transactions t where accountNumber = ? and createAt between ? and ? order by idTransaction desc;`;
        try
        {
            client = await this.db.getConnection();
            const rows: any[] = await client.query(sqlGetMovements, [request.accountNumber, request.startDate, request.endDate]);
            response.result = rows[0]

            if(response.result[0] == null)
            {
                response.code = '404';
                response.info = 'No se encontró información.'
            }

            client.release();
        }
        catch (error)
        {
            client.release();
            let getError = MetodosGenericos.addTipoError(error.toString(), "Base", this.nameClass + ".getMovements");
            throw new Error(getError);
        }
        return response;
    }

}
