import { ProviderType } from './provider-type';
import { PaymentTool } from '../payment-tool';

export abstract class TokenizedCardData extends PaymentTool {
    provider: ProviderType;
}
