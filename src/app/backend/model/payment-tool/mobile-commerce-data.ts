import { PaymentTool } from './payment-tool';
import { PaymentToolType } from './payment-tool-type';
import { PhoneNumberData } from './phone-number-data';

export class MobileCommerceData extends PaymentTool {
    paymentToolType = PaymentToolType.MobileCommerceData;
    mobilePhone: PhoneNumberData;
}
