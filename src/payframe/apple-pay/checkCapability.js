// function checkCapability(merchantID) {
//     return new Promise((resolve) => {
//         if (window.ApplePaySession && ApplePaySession.canMakePayments) {
//             ApplePaySession.canMakePaymentsWithActiveCard(merchantID).then((capability) => {
//                 resolve(capability ? 'capable' : 'unavailable');
//             });
//         } else {
//             resolve('unavailable');
//         }
//     });
// }

function checkCapability() {
    return new Promise((resolve) => {
        if (window.ApplePaySession && ApplePaySession.canMakePayments) {
            resolve(ApplePaySession.canMakePayments ? 'capable' : 'unavailable');
        } else {
            resolve('unavailable');
        }
    });
}

export default checkCapability;
