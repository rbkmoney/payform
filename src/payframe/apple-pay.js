function checkCapability(merchantID) {
    return new Promise((resolve) => {
        if (window.ApplePaySession && ApplePaySession.canMakePayments) {
            ApplePaySession.canMakePaymentsWithActiveCard(merchantID).then((capability) => {
                resolve(capability ? 'capable' : 'unavailable');
            });
        } else {
            resolve('unavailable');
        }
    });
}

class ApplePayWrapper {

    constructor(amount, product) {
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
    }

    begin() {
        this.session.begin();
    }

}

export {ApplePayWrapper, checkCapability};
