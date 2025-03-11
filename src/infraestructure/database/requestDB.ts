import { Inject, Injectable } from '@nestjs/common';
import { IRequestDB } from 'src/application/common/database/IRequestDB';
import { MetodosGenericos } from 'src/application/common/utils/metodos_genericos';
import { ConnectionDB } from './ConnectionDB';
import { PoolConnection } from 'mysql2/promise';
import { GeneralResponse } from 'src/application/common/Model/generalResponse';
import { GeneralRequest } from 'src/application/common/Model/generalRequest';
import { GetMovementsDto } from 'src/application/consolidatedPosition/getMovements/getMovementsDto';
import { GetStatusDto } from 'src/application/getransferStatus/getStatusDto';


@Injectable()
export class RequestDB implements IRequestDB {
  private readonly nameClass = RequestDB.name;
  constructor(@Inject('ConnectionDB') private readonly db: ConnectionDB) {}

  /**
   * Obtener información del usuario
   * @param request
   * @returns
   */
  async getDataSocio(request: GeneralRequest): Promise<GeneralResponse> {
    let client: PoolConnection;
    let response = new GeneralResponse();
    const sqlGetUser = `select idPartner, identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate from core.partners where identification = ?;`;
    try {
      client = await this.db.getConnection();
      const rows: any[] = await client.query(sqlGetUser, [
        request.identificationNumber,
      ]);
      response.result = rows[0][0];

      if (response.result == null) {
        response.code = '404';
        response.info = 'No se encontró información.';
      }

      client.release();
    } catch (error) {
      client.release();
      let getError = MetodosGenericos.addTipoError(
        error.toString(),
        'Base',
        this.nameClass + '.getDataSocio',
      );
      throw new Error(getError);
    }
    return response;
  }

  /**
   * Obtener cuentas de debito
   * @param request
   * @returns
   */
  async getDebitAccounts(request: GeneralRequest): Promise<GeneralResponse> {
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
    try {
      client = await this.db.getConnection();
      const rows: any[] = await client.query(sqlGetAccounts, [
        request.identificationNumber,
      ]);
      response.result = rows[0];

      if (response.result[0] == null) {
        response.code = '404';
        response.info = 'No se encontró información.';
      }

      client.release();
    } catch (error) {
      client.release();
      let getError = MetodosGenericos.addTipoError(
        error.toString(),
        'Base',
        this.nameClass + '.getDebitAccounts',
      );
      throw new Error(getError);
    }
    return response;
  }

  /**
   * Obtener productos del socio
   * @param request
   * @returns
   */
  async getProducts(request: GeneralRequest): Promise<GeneralResponse> {
    let client: PoolConnection;
    let response = new GeneralResponse();
    const sqlGetAccounts = `select numAccount, 
                                    typeAccount, case typeAccount when 1 then 'Ahorros' else 'Otros' end as description,
                                    case when acceptDebit = 1 then 1 else 0 end as acceptDebit,
                                    case when acceptCredit = 1 then 1 else 0 end as acceptCredit,
                                    availableBalance, blockedBalance, lastMovement
                                from core.accounts where partnerId = ? and status = 'A'`;
    try {
      client = await this.db.getConnection();
      const rows: any[] = await client.query(sqlGetAccounts, [
        request.idPartner,
      ]);
      response.result = { saving: rows[0], credits: [], investments: [] };

      if (response.result.saving[0] == null) {
        response.code = '404';
        response.info = 'No se encontró información.';
      }

      client.release();
    } catch (error) {
      client.release();
      let getError = MetodosGenericos.addTipoError(
        error.toString(),
        'Base',
        this.nameClass + '.getDebitAccounts',
      );
      throw new Error(getError);
    }
    return response;
  }

  /**
   * Obtener movimientos de una cuenta
   * @param request
   * @returns
   */
  async getMovements(request: GetMovementsDto): Promise<GeneralResponse> {
    let client: PoolConnection;
    let response = new GeneralResponse();
    const sqlGetMovements = `select sign, value, balance, observation, reference, typeTransaction, idTransaction, date_format(createAt, "%Y-%m-%d %T") date from core.transactions t where accountNumber = ? and createAt between ? and ? order by idTransaction desc;`;
    try {
      client = await this.db.getConnection();
      const rows: any[] = await client.query(sqlGetMovements, [
        request.accountNumber,
        request.startDate,
        request.endDate,
      ]);
      response.result = rows[0];

      if (response.result[0] == null) {
        response.code = '404';
        response.info = 'No se encontró información.';
      }

      client.release();
    } catch (error) {
      client.release();
      let getError = MetodosGenericos.addTipoError(
        error.toString(),
        'Base',
        this.nameClass + '.getMovements',
      );
      throw new Error(getError);
    }
    return response;
  }



  /**
   * Obtener cuenta por numero de cedula o cuenta
   * @param request
   * @returns
   */
  async getAccountByCedulaOrNumeroCuenta(request:GeneralRequest): Promise<GeneralResponse> {
    let client: PoolConnection;
    const response = new GeneralResponse();

    if (!request.identificationNumber && !request.accountNumber) {
      response.code = 'INVALID_REQUEST';
      response.info =
        'Debe proporcionar una identificación o un número de cuenta para realizar la búsqueda.';
      response.result = null;
      return response;
    }

    const sqlQuery = `
        SELECT 
            a.idAccount, a.numAccount, a.name AS accountName, a.typeAccount, a.availableBalance, 
            a.blockedBalance, a.lastMovement, a.status,
            p.idPartner, p.identification, p.names, p.lastName, p.email, p.phone
        FROM accounts a
        INNER JOIN partners p ON a.partnerId = p.idPartner
        WHERE 1 = 1
        ${request.identificationNumber ? 'AND p.identification = ?' : ''}
        ${request.accountNumber ? 'AND a.numAccount = ?' : ''}
    `;

    const params = [
      ...(request.identificationNumber ? [request.identificationNumber] : []),
      ...(request.accountNumber ? [request.accountNumber] : []),
    ];

    try {
      client = await this.db.getConnection();
      const [rows]: any[] = await client.query(sqlQuery, params);

      if (rows && rows.length > 0) {
        response.result = rows;
      } else {
        response.code = '404';
        response.info = 'No se encontró información.';
        response.result = [];
      }

      client.release();
    } catch (error) {
      if (client) client.release();
      console.error('Error in getAccountByCedulaOrNumeroCuenta:', error);

      response.code = 'ERROR_DATABASE';
      response.info = 'Se presentó un error al obtener la información.';
      response.result = null;

      MetodosGenericos.addTipoError(
        error.toString(),
        'Base',
        `${this.nameClass}.getAccountByCedulaOrNumeroCuenta`,
      );
    }

    return response;
  }

  /**
   * Obtener historial de transferencias
   * @param request
   * @returns
   */
  async getTransfer(request:GeneralRequest): Promise<GeneralResponse> {
    let client: PoolConnection;
    const response = new GeneralResponse();
    const sqlGetTransfers = `
            SELECT 
                t.idTransaction, t.accountNumber AS sourceAccount, t.affectedAccountNumber AS destinationAccount, 
                t.value AS amountTransferred, DATE_FORMAT(t.createAt, "%Y-%m-%d %T") AS transactionDate, 
                t.typeTransaction, t.observation, t.reference, t.identificationBenef AS beneficiaryIdentification, 
                t.nameBenef AS beneficiaryName, t.idBank,
                CASE 
                    WHEN t.accountNumber = ? THEN 'Enviada'
                    ELSE 'Recibida'
                END AS transactionType
            FROM transactions t
            WHERE 
                (t.accountNumber = ? OR t.affectedAccountNumber = ?) 
                AND t.typeTransaction = 'TRANSFER' 
                AND t.createAt BETWEEN ? AND ?
            ORDER BY t.createAt DESC;
        `;

    try {
      client = await this.db.getConnection();

      const [rows]: any[] = await client.query(sqlGetTransfers, [
        request.accountNumber,
        request.accountNumber,
        request.accountNumber,
        request.startDate,
        request.endDate,
      ]);

      if (rows && rows.length > 0) {
        response.result = rows;
      } else {
        response.code = 'NO_DATA_FOUND';
        response.info = 'No se encontraron transferencias en este periodo.';
        response.result = [];
      }

      client.release();
    } catch (error) {
      if (client) client.release();
      console.error('Error in getTransfer:', error);

      response.code = 'ERROR_DATABASE';
      response.info = 'Se presentó un error al obtener las transferencias.';
      response.result = null;

      MetodosGenericos.addTipoError(
        error.toString(),
        'Base',
        `${this.nameClass}.getTransfer`,
      );
    }

    return response;
  }

  /**
   * Obtener el balance de una cuenta
   * @param request
   * @returns
   */

  async getConsolidatedBalance(request: GeneralRequest): Promise<GeneralResponse> {
    let client: PoolConnection;
    const response = new GeneralResponse();
  
    const sqlGetConsolidatedBalance = `
      SELECT 
          a.numAccount,
          a.availableBalance,
          a.name AS accountName,
          a.blockedBalance,
          COALESCE(SUM(t.value), 0) AS totalTransferred
      FROM accounts a
      LEFT JOIN transactions t 
          ON a.numAccount = t.accountNumber OR a.numAccount = t.affectedAccountNumber
      WHERE a.numAccount = ?
      GROUP BY a.numAccount, a.availableBalance, a.blockedBalance, a.name;
    `;
  
    try {
      client = await this.db.getConnection();
      const [rows]: any[] = await client.query(sqlGetConsolidatedBalance, [request.accountNumber]);
  
      if (rows.length > 0) {  
        response.result = {saving: rows[0], credits: [], investments: []
        };
      } else {
        response.code = '404';
        response.info = 'No se encontró información.';
      }
    } catch (error) {
      console.error('Error en getConsolidatedBalance:', error);
      response.code = 'ERROR_DATABASE';
      response.info = 'Error al obtener el saldo consolidado.';
      MetodosGenericos.addTipoError(error instanceof Error ? error.message : String(error), 'Base', `${this.nameClass}.getConsolidatedBalance`);
    } finally {
      if (client) client.release();
    }
  
    return response;
  }
  
  /**
   * Obtener bancos
   * @param request
   * @returns
   */
  async getBanks(): Promise<GeneralResponse> {
    let client: PoolConnection;
    const response = new GeneralResponse();

    const sqlGetBanks = `
            SELECT 
                idBank, bankCode, name, status, 
                DATE_FORMAT(createAt, "%Y-%m-%d %T") AS createAt 
            FROM banks 
            ORDER BY name ASC;
        `;

    try {
      client = await this.db.getConnection();
      const [rows]: any[] = await client.query(sqlGetBanks);

      if (Array.isArray(rows) && rows.length > 0) {
        response.result = rows;
      } else {
        response.code = '404';
        response.info = 'No se encontró información.';
        response.result = [];
      }

      client.release();
    } catch (error) {
      if (client) client.release();
      console.error('Error in getBanks:', error);

      response.code = 'ERROR_DATABASE';
      response.info =
        'Se presentó un error al obtener las entidades financieras.';
      response.result = null;

      MetodosGenericos.addTipoError(
        error instanceof Error ? error.message : String(error),
        'Base',
        `${this.nameClass}.getBanks`,
      );
    }

    return response;
  }

  async getTransferStatus(request: GetStatusDto): Promise<GeneralResponse> {
    let client: PoolConnection;
    const response = new GeneralResponse();

    const sqlGetTransferStatus = `
        SELECT 
            idTransaction, 
            status, 
            DATE_FORMAT(createAt, "%Y-%m-%d %T") AS createAt,
            accountNumber AS sender_account, 
            affectedAccountNumber AS receiver_account,
            value AS transfer_value,
            observation
        FROM transactions
        WHERE reference = ?
    `;

    try {
        client = await this.db.getConnection();
        const [rows]: any[] = await client.query(sqlGetTransferStatus, [request.reference]);

        if (Array.isArray(rows) && rows.length > 0) {
            response.result = rows;
        } else {
            response.code = '404';
            response.info = 'No se encontró información.';
            response.result = [];
        }

        client.release();
    } catch (error) {
        if (client) client.release();
        console.error('Error in getTransferStatus:', error);

        response.code = 'ERROR_DATABASE';
        response.info = 'Se presentó un error al obtener el estado de la transferencia.';
        response.result = null;

        MetodosGenericos.addTipoError(
            error instanceof Error ? error.message : String(error),
            'Base',
            `${this.nameClass}.getTransferStatus`,
        );
    }

    return response;
}

}
