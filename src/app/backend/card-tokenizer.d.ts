declare module 'tokenizer/src/tokenizers/CardTokenizer' {

    export default class CardTokenizer {

        static createToken(capiEndpoint: string, accessToken: string, paymentTool: any): Promise<any>;
    }
}
