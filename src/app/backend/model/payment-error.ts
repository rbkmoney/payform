export class PaymentError {
    code: string;
    subError?: PaymentError;
}
