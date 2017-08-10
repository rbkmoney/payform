class ApplePayWrapper {

    constructor(validationEndpoint, amount, product) {
        const paymentRequest = {
            countryCode: 'RU',
            currencyCode: 'RUB',
            total: {
                label: product,
                amount: (amount / 100) + ''
            },
            supportedNetworks: ['masterCard', 'visa'],
            merchantCapabilities: ['supports3DS']
        };
        this.session = new ApplePaySession(1, paymentRequest);
        this.validationEndpoint = validationEndpoint;
    }

    begin() {
        return new Promise((resolve) => {
            this.session.onvalidatemerchant = (event) => {
                validateMerchant(this.validationEndpoint, event.validationURL).then((response) => {
                    this.session.completeMerchantValidation(response);
                });
            };
            this.session.onpaymentauthorized = (event) => {
                resolve(event.payment);
            };
            this.session.begin();
        });
    }

    complete() {
        this.session.completePayment(ApplePaySession.STATUS_SUCCESS);
    }

}

export default ApplePayWrapper;
