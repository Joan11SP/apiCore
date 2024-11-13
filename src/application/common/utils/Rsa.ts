const forge = require('node-forge');

export class Rsa
{
    
    /**
     * Obtiene datos para generar llaves de cifrado
     * @returns
     */
    public static getDatosRsa = async () =>
    {
        let iv = forge.random.getBytesSync(16);    
        let seed = forge.random.getBytesSync(32);
        // Generar un par de claves RSA basado en la cadena de entrada
        const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001, seed });
        // Convertir las claves a formato PEM (Privacy Enhanced Mail)
        const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);
        const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
    
        const publicKeyPemBase64 = forge.util.encode64(publicKeyPem);
        const privatePemBase64 = forge.util.encode64(privateKeyPem);
        const ivBase64 = Buffer.from(iv, 'binary').toString('base64');

        let response = 
        {
            publicBase64: publicKeyPemBase64,
            privateBase64Pem: privatePemBase64,
            iv: ivBase64
        }        
        return response;
    }


}
