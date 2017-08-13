import validateMerchant from './validateMerchant';

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
        this.session = new ApplePaySession(2, paymentRequest);
        this.validationEndpoint = validationEndpoint;
    }

    begin() {
        return new Promise((resolve, reject) => {
            this.session.onvalidatemerchant = () => {
                validateMerchant(this.validationEndpoint).then((response) => {
                    this.session.completeMerchantValidation(response);
                }).catch(() => {
                    this.session.abort();
                    reject({code: 'error.apple.pay.merchant.validation'});
                });
            };
            this.session.onpaymentauthorized = (event) => resolve(event.payment);
            this.session.begin();
        });
    }

    complete() {
        this.session.completePayment(ApplePaySession.STATUS_SUCCESS);
    }

    failure() {
        this.session.completePayment(ApplePaySession.STATUS_FAILURE);
    }

}

export default ApplePayWrapper;
