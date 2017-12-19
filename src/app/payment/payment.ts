export enum PaymentType {
    cardPayment = 'cardPayment'
}

export enum PaymentStageStatus {
    waitProcessing = 'waitProcessing',
    suspend = 'suspend',
    inProcess = 'inProcess',
    done = 'done'
}

export abstract class Payment {
    type: PaymentType;
}

export class CardPayment extends Payment {
    createInvoice?: PaymentStageStatus;
    createPaymentResource: PaymentStageStatus;
    createPayment: PaymentStageStatus;
    pollEvents: PaymentStageStatus;
}

type Changer = (...params: any[]) => any;

type Action = () => any;

interface Condition {
    start: boolean;
    done: boolean;
    retry: boolean;
}

export const manage = (payment: Payment, step: string, action: Action, changer: Changer) => {

};
