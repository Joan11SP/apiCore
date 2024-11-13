import { Inject, Injectable } from "@nestjs/common";
import { MetodosGenericos } from "src/application/common/utils/metodos_genericos";
import { ConnectionDB } from "./ConnectionDB";
import { PoolConnection } from "mysql2/promise";
import { InternalTransactionDto } from "src/application/transacctions/internalTransaction/internalTransactionDto";
import { GeneralResponse } from "src/application/common/Model/generalResponse";
import { ITransactionsDB } from "src/application/common/database/ITransactionsDB";
import { ValidateInternalAccountDto } from "src/application/transacctions/validateInternalAccount/validateInternalAccountDto";

@Injectable()
export class TransactionsDB implements ITransactionsDB
{
    private readonly nameClass = TransactionsDB.name;
    constructor(@Inject('ConnectionDB') private readonly db: ConnectionDB){}

    /**
     * Obtener información del usuario
     * @param request 
     * @returns 
     */
    async addInternalTransaction(request: InternalTransactionDto): Promise<GeneralResponse>
    {
        let client: PoolConnection;
        let response = new GeneralResponse();
        let transaction = false;

        const getDebitAccount = `select idAccount, acceptDebit, availableBalance from core.accounts where partnerId = ? and numAccount = ? and status = 'A'`;
        const getCreditAccount = `select idAccount, availableBalance from core.accounts where numAccount = ? and acceptCredit = 1 and status = 'A'`;
        const sqlInsertTransaction = `insert into core.transactions (sign, typeTransaction, value, accountNumber, affectedAccountNumber, balance, observation, connectionIp, reference, identificationBenef, nameBenef, createAt) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
        const sqlSetDbit = `update core.accounts set availableBalance = availableBalance - ?, lastMovement = now() where idAccount = ?;`
        const sqlSetCredit = `update core.accounts set availableBalance = availableBalance + ?, lastMovement = now() where idAccount = ?;`
        try
        {
            if(request.originAccountNumber === request.destinationAccountNumber)
            {
                response.code = '400';
                response.info = 'Cuenta origen y destino iguales.';
                return response;
            }

            client = await this.db.getConnection();
            
            let rowsDebitAccount = await client.query(getDebitAccount, [ request.idPartner, request.originAccountNumber ]);
            let debit = rowsDebitAccount[0][0];

            if(debit == null)
            {
                client.release()
                response.code = '404';
                response.info = 'Cuenta origen está bloqueada, inactiva o no existe.';
                return response;
            }

            if (Number(debit.availableBalance) < request.value)
            {
                client.release()
                response.code = '400';
                response.info = 'Saldo insuficiente';
                return response;
            }

            let rowsCreditAccount = await client.query(getCreditAccount, [ request.destinationAccountNumber ]);
            let credit = rowsCreditAccount[0][0];
            if(credit == null)
            {
                client.release()
                response.code = '404';
                response.info = 'Cuenta destino está bloqueada, inactiva o no existe.';
                return response;
            }
            let idTransaction = 0;
            await client.beginTransaction()

                transaction = true;

                // debit
                let values =
                [ 
                    '-', 
                    'TRANSFER',
                    request.value,
                    request.originAccountNumber,
                    request.destinationAccountNumber,
                    Number(debit.availableBalance) - request.value,
                    request.observation,
                    request.ipPublic,
                    request.idReference,
                    request.identificationBenef,
                    request.nameBenef,
                    new Date()
                ]
                let rowsDebit:any[] = await client.query(sqlInsertTransaction, values);
                idTransaction = rowsDebit[0].insertId;
                
                await client.query(sqlSetDbit, [request.value, debit.idAccount]);

                values[0] = '+'
                values[5] = Number(credit.availableBalance) + request.value;
                values[3] = request.destinationAccountNumber;
                values[4] = request.originAccountNumber;
                values[11] = new Date()

                await client.query(sqlInsertTransaction, values);
                await client.query(sqlSetCredit, [request.value, credit.idAccount]);

            await client.commit();

            response.result = {idTransaction};

            client.release();
        }
        catch (error)
        {
            if(transaction) await client.rollback();
            let getError = MetodosGenericos.addTipoError(error.toString(), "Base", this.nameClass + ".addInternalTransaction");
            if (client != null) client.release();
            throw new Error(getError);
        }
        return response;
    }

    /**
     * Validar si existe una cuenta para transaccionar
     * @param request 
     * @returns 
     */
    async validateInternalAccount(request: ValidateInternalAccountDto): Promise<GeneralResponse>
    {
        let client: PoolConnection;
        let response = new GeneralResponse();
        let transaction = false;

        const sqlValidateAccount = `select
                            typeAccount,
                            case when acceptDebit = 1 then 1 else 0 end as acceptDebit,
                            case when acceptCredit = 1 then 1 else 0 end as acceptCredit,
                            concat(names, ' ', lastName, ' ', mothersLastName) as names,
                            identification,
                            email
                            from core.accounts join partners p on idPartner = partnerId and numAccount = ? and identification <> ? and acceptCredit = 1 and status = 'A'`;
        try
        {
            client = await this.db.getConnection();

            let rowsAccount = await client.query(sqlValidateAccount, [ request.numberAccount, request.identificationNumber ]);
            response.result = rowsAccount[0][0];

            if(response.result == null)
            {
                response.code = '404';
                response.info = 'No se encontró información.'
            }            

            client.release();
        }
        catch (error)
        {
            if(transaction) await client.rollback();
            let getError = MetodosGenericos.addTipoError(error.toString(), "Base", this.nameClass + ".addInternalTransaction");
            if (client != null) client.release();
            throw new Error(getError);
        }
        return response;
    }

}
