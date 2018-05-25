declare namespace google.payments.api {
    export class PaymentsClient {
        constructor(options?: PaymentOptions);

        isReadyToPay(request: IsReadyToPayRequest): Promise<ReadyToPayResponse>;

        loadPaymentData(paymentDataRequest: PaymentDataRequest): Promise<PaymentData>;
    }
}

interface PaymentOptions {
    environment: 'TEST' | 'PRODUCTION';
}

interface IsReadyToPayRequest {
    allowedPaymentMethods: string[];
}

interface ReadyToPayResponse {
    result: boolean;
}

interface PaymentDataRequest {
    merchantId: string;
    paymentMethodTokenizationParameters: PaymentMethodTokenizationParameters;
    allowedPaymentMethods: string[];
    cardRequirements: CardRequirements;
    transactionInfo: TransactionInfo;
    phoneNumberRequired?: boolean;
    emailRequired?: boolean;
    shippingAddressRequired?: boolean;
    shippingAddressRequirements?: ShippingAddressRequirements;
}

interface TransactionInfo {
    currencyCode: string;
    totalPriceStatus?: 'FINAL' | 'NOT_CURRENTLY_KNOWN' | 'ESTIMATED';
    totalPrice?: string;
}

interface CardRequirements {
    allowedCardNetworks: string[];
    billingAddressRequired?: boolean;
    billingAddressFormat?: 'MIN' | 'FULL';
}

interface PaymentMethodTokenizationParameters {
    tokenizationType: 'PAYMENT_GATEWAY' | 'DIRECT';
    parameters: any;
}

interface PaymentData {
    paymentMethodToken: PaymentMethodToken;
    cardInfo: CardInfo;
    shippingAddress?: UserAddress;
    email?: string;
}

interface CardInfo {
    cardDescription: string;
    cardClass: 'CREDIT' | 'DEBIT';
    cardDetails: string;
    cardNetwork: string;
    billingAddress?: UserAddress;
}

interface PaymentMethodToken {
    tokenizationType: string;
    token: string;
}

interface ShippingAddressRequirements {
    allowedCountryCodes: string[];
}

type UserAddress = any;

interface PaymentsError {
    statusCode: string;
    statusMessage: string;
}
