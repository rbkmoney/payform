interface ApplePayPaymentRequest {
    total: {
        label: string;
        amount: string;
    };
    countryCode: string;
    currencyCode: string;
    supportedNetworks: string[];
    merchantCapabilities: string[];
    billingContact?: any;
    shippingContact?: any;
    shippingMethods?: any;
    shippingType?: any;
    requiredBillingContactFields?: any;
    requiredShippingContactFields?: any;
}

declare class ApplePaySession {
    static STATUS_FAILURE: number;

    static STATUS_SUCCESS: number;

    static canMakePayments(): boolean;

    static canMakePaymentsWithActiveCard(merchantIdentifier: string): boolean;

    constructor(version: number, request: ApplePayPaymentRequest);

    completeMerchantValidation(merchantSession: any): void;

    abort(): void;

    begin(): void;

    completePayment(status: ApplePayStatusCodes): void;

    completePaymentMethodSelection(newTotal: any, newLineItems: any): void;

    completeShippingContactSelection(
        status: ApplePayStatusCodes,
        newShippingMethods: any,
        newTotal: any,
        newLineItems: any
    ): void;

    completeShippingMethodSelection(status: ApplePayStatusCodes, newTotal: any, newLineItems: any): void;

    supportsVersion(version: number): boolean;

    oncancel: (event: any) => void;

    onpaymentauthorized: (event: any) => void;

    onpaymentmethodselected: (event: any) => void;

    onshippingcontactselected: (event: any) => void;

    onshippingmethodselected: (event: any) => void;

    onvalidatemerchant: (event: any) => void;
}

declare enum ApplePayStatusCodes {
    STATUS_SUCCESS = 1,
    STATUS_FAILURE,
    STATUS_INVALID_BILLING_POSTAL_ADDRESS,
    STATUS_INVALID_SHIPPING_POSTAL_ADDRESS,
    STATUS_INVALID_SHIPPING_CONTACT,
    STATUS_PIN_REQUIRED,
    STATUS_PIN_INCORRECT,
    STATUS_PIN_LOCKOUT
}

interface ApplePayPayload {
    merchantIdentifier: string;
    domainName: string;
    displayName: string;
}

interface ApplePayPayment {
    token: ApplePayPaymentToken;
}

type ApplePayPaymentToken = any;
