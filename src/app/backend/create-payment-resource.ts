/// <reference path="./card-tokenizer.d.ts" />
import CardTokenizer from 'tokenizer/src/tokenizers/CardTokenizer';
import { PaymentResource, PaymentTool } from 'checkout/backend/model';

export const createPaymentResource = (capiEndpoint: string, accessToken: string, paymentTool: PaymentTool): Promise<PaymentResource> =>
    CardTokenizer.createToken(capiEndpoint, accessToken, paymentTool);
