declare namespace google.payments.api {

    export interface ReadyToPayResponse {
        result: boolean;
    }

    export class PaymentsClient {
        constructor(mode: {
            environment: 'TEST' | 'PRODUCTION';
        });

        isReadyToPay(param: {
            allowedPaymentMethods: string[]
        }): Promise<ReadyToPayResponse>;

        loadPaymentData(request: any): Promise<any>;
    }
}
