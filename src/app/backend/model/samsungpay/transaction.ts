export class Transaction {
    id: string;
    href: string;
    resultCode: string;
    resultMessage: string;
    encInfo: {
        mod: string,
        exp: string,
        keyId: string
    };
}
