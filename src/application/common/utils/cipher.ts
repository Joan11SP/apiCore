import { Inject, Injectable, Scope } from "@nestjs/common";
import { IRedis } from "src/application/common/apis/IRedis";
const forge = require('node-forge');
import { ICipher } from "../apis/ICipher";
import { Constantes } from "../Model/constantes";

@Injectable({ scope: Scope.TRANSIENT })
export class Cipher implements ICipher
{

    private iv: string = '';
    private aesKey: string = '';
    constructor(@Inject('IRedis') private readonly IRedis: IRedis) { }

    /**
    * Metodo para descifrar informacion
    * @param {any} request Informacion de solicitud
    * @param {any} headers Headers http
    */
    public getDecipherData = async (request: any, headers: any) =>
    {
        let key = `cipher_${headers.id}_${headers.uid}`;
        let getData = await this.IRedis.getData(key);
        
        if(getData == null)
            return Constantes.keyRedisNotFound;

        let getLaves = JSON.parse(getData);

        return this.decipherData(getLaves, request.data, headers);
    }

    /**
    * Metodo para cifrar informacion
    * @param {any} response Informacion de respuesta
    * @param {any} headers Headers http
    */
    public setCipherData = async (response: any, headers: any) =>
    {
        return this.cipherData(response);
    }


    // descifrar informacion entrate
    private decipherData = async (dataLlaves: any, request: any, headers: any): Promise<any> =>
    {

        let privateBase64Pem = forge.util.decode64(dataLlaves.privateBase64Pem);

        let privateKey = forge.pki.privateKeyFromPem(privateBase64Pem);

        let encryptedMessage = forge.util.decode64(headers.key);
        // Realizar el descifrado OAEP con SHA-256
        let decryptedMessage = privateKey.decrypt(encryptedMessage, 'RSA-OAEP', { md: forge.md.sha256.create() });

        let decryptAes = forge.util.decode64(decryptedMessage);
        this.iv = dataLlaves.iv;

        this.aesKey = decryptAes;

        let ivBytes = forge.util.createBuffer(Buffer.from(dataLlaves.iv, 'base64'));
        let message = forge.util.createBuffer(Buffer.from(request, 'base64'));

        let decipher = forge.cipher.createDecipher('AES-CBC', decryptAes);
        decipher.start({ iv: ivBytes });
        decipher.update(message);

        // Obtener los bytes descifrados
        const decryptedBytes = decipher.output;

        // Quitar el relleno PKCS7
        let remove = this.removePKCS7Padding(decryptedBytes);

        // Convertir los bytes descifrados a una cadena UTF-8
        return remove.toString('utf8');

    }

    // Función para quitar el relleno PKCS7
    removePKCS7Padding(buffer)
    {
        const paddingLength = buffer.at(buffer.length() - 1);

        // Convertir los bytes a una cadena UTF-8
        const decryptedMessage = buffer.bytes().slice(0, -paddingLength);

        // Retornar una nueva instancia de Buffer con los bytes correctos
        return forge.util.createBuffer(decryptedMessage).toString('utf8');
    }

    // cifrar informacion de respuesta
    private cipherData = async (response: any): Promise<any> => 
    {
        let ivBytes = forge.util.createBuffer(Buffer.from(this.iv, 'base64'));

        // Crear una instancia de cifrado AES en modo CBC
        const cipherr = forge.cipher.createCipher('AES-CBC', this.aesKey);
        cipherr.start({ iv: ivBytes });

        // El mensaje a cifrar
        const messagee = JSON.stringify(response);

        const messageBytes = forge.util.createBuffer(messagee, 'utf8');

        // Cifrar el mensaje
        cipherr.update(messageBytes);
        cipherr.finish();
        const encryptedBytes = cipherr.output.getBytes();

        // Convertir los bytes cifrados a una representación legible (Base64, en este caso)
        return forge.util.encode64(encryptedBytes);

    }

    /**
     * Cifrar aes
     * @param text 
     * @returns 
     */
    public cipherDataAes = async (text: any) =>
    {
        let keyBuffer = forge.util.createBuffer(Buffer.from(this.aesKey, 'base64'));
        let ivBuffer = forge.util.createBuffer(Buffer.from(this.iv, 'base64'));

        let cipher = forge.cipher.createCipher('AES-CBC', keyBuffer);
        cipher.start({ iv: ivBuffer });
        // El mensaje a cifrar
        const messagee = JSON.stringify(text);
        const messageBytes = forge.util.createBuffer(messagee, 'utf8');

        // Cifrar el mensaje
        cipher.update(messageBytes);
        cipher.finish();
        const encryptedBytes = cipher.output.getBytes();

        // Convertir los bytes cifrados a una representación legible (Base64, en este caso)
        return forge.util.encode64(encryptedBytes);
    }

    /**
     * Decifrar aes
     * @param hash 
     * @param key 
     * @returns 
     */
    public decipherDataAes = async (hash: string, key: string, iv: string) =>
    {
        this.aesKey = key;
        this.iv = iv;
        let ivBytes = forge.util.createBuffer(Buffer.from(iv, 'base64'));
        let keyBuffer = forge.util.createBuffer(Buffer.from(key, 'base64'));

        let messageBuffer = Buffer.from(hash, 'base64');

        let decipher = forge.cipher.createDecipher('AES-CBC', keyBuffer);
        decipher.start({ iv: ivBytes });
        decipher.update(forge.util.createBuffer(messageBuffer));
        decipher.finish();
        // outputs decrypted hex
        // Obtener los bytes descifrados
        const decryptedBytes = decipher.output;

        // Convertir los bytes descifrados a una cadena UTF-8
        return decryptedBytes.toString('utf8');
    }

}