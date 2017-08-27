import CardTokenizer from 'tokenizer/src/tokenizers/CardTokenizer';

function preparePaymentTool(cardData) {
    return {
        paymentToolType: 'CardData',
        cardHolder: cardData.cardHolder,
        cardNumber: replaceSpaces(cardData.cardNumber),
        expDate: replaceSpaces(cardData.cardExpire),
        cvv: cardData.cardCvv
    };
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
    return CardTokenizer.createToken(param.capiEndpoint, param.accessToken, preparePaymentTool(param.cardData));
}

export default createPaymentToolToken;
