import validateMerchant from './validateMerchant';
import URL from 'url-parse';

class ApplePayWrapper {

    /**
     * @param {Object} param
     * @param {string} param.validationEndpoint
     * @param {string} param.merchantID
     * @param {string} param.host
     * @param {number} param.amount
     * @param {string} param.product
     */
    constructor(param) {
        const paymentRequest = {
            countryCode: 'RU',
            currencyCode: 'RUB',
            total: {
                label: param.product,
                amount: (param.amount / 100) + ''
            },
            supportedNetworks: ['masterCard', 'visa'],
            merchantCapabilities: ['supports3DS']
        };
        this.session = new ApplePaySession(2, paymentRequest);
        this.validationEndpoint = param.validationEndpoint;
        this.merchantID = param.merchantID;
        this.domain = new URL(param.host).hostname;
    }

    begin() {
        return new Promise((resolve, reject) => {
            this.session.onvalidatemerchant = () => {
                validateMerchant(this.validationEndpoint, this.merchantID, this.domain)
                    .then((response) => this.session.completeMerchantValidation(response))
                    .catch(() => {
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
