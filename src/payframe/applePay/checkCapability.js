function checkCapability(merchantID, testFlag) {
    return new Promise((resolve) => {
        if (window.ApplePaySession && ApplePaySession.canMakePayments) {
            ApplePaySession.canMakePaymentsWithActiveCard(merchantID).then((capability) => {
                // TODO fix after real apple pay payments api capability
                resolve(capability && testFlag ? 'capable' : 'unavailable');
            }).catch(() => resolve('unavailable'));
        } else {
            resolve('unavailable');
        }
    });
}

export default checkCapability;
