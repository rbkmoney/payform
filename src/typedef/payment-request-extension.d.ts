declare interface PaymentRequest {
    canMakePayment(): Promise<boolean>;
}
