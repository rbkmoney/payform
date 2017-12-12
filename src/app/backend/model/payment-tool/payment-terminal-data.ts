import { PaymentTool } from './payment-tool';
import { PaymentToolType } from './payment-tool-type';

export class PaymentTerminalData extends PaymentTool {
    paymentToolType = PaymentToolType.PaymentTerminalData;
    provider = 'euroset';
}
