

export interface ICipher
{
    getDecipherData (request: any, headers: any);
    setCipherData (response: any, headers: any);
    decipherDataAes (hash: string, key: string, iv:string);
    cipherDataAes (text: string);
}