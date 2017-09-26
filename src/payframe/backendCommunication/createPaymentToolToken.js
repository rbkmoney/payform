import CardTokenizer from 'tokenizer/src/tokenizers/CardTokenizer';

function preparePaymentTool(paymentTool) {
    switch (paymentTool.type) {
        case 'CardData':
            return {
                paymentToolType: paymentTool.type,
                cardHolder: paymentTool.cardHolder,
                cardNumber: replaceSpaces(paymentTool.cardNumber),
                expDate: replaceSpaces(paymentTool.cardExpire),
                cvv: paymentTool.cardCvv
            };
        case 'PaymentTerminalData':
            return {
                paymentToolType: paymentTool.type,
                provider: paymentTool.provider
            };
        default:
            break;
    }
}

function replaceSpaces(str) {
    return str.replace(/\s+/g, '');
}

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.accessToken
 * @param {CardData} param.cardData
 * @return {Promise<Payload>}
 */
function createPaymentToolToken(param) {
    return CardTokenizer.createToken(param.capiEndpoint, param.accessToken, preparePaymentTool(param.paymentTool));
}

export default createPaymentToolToken;
