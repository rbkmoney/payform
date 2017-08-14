import CardTokenizer from 'tokenizer/src/tokenizers/CardTokenizer';
import PaymentCreator from './PaymentCreator';
import EventPoller from './EventPoller';

class Processing {

    static process(params) {
        const paymentTool = Processing.preparePaymentTool(params.cardHolder, params.cardNumber, params.cardExpire, params.cardCvv);
        return CardTokenizer.createToken(params.capiEndpoint, params.invoiceAccessToken, paymentTool).then((token) => {
            return PaymentCreator.create(params.capiEndpoint, params.invoiceID, params.invoiceAccessToken, token, params.email).then(() => {
                return EventPoller.pollEvents(params.capiEndpoint, params.invoiceID, params.invoiceAccessToken);
            });
        });
    }

    static preparePaymentTool(cardHolder, cardNumber, expDate, cvv) {
        return {
            paymentToolType: 'CardData',
            cardHolder: cardHolder,
            cardNumber: Processing.replaceSpaces(cardNumber),
            expDate: Processing.replaceSpaces(expDate),
            cvv: cvv
        }
    }

    static replaceSpaces(str) {
        return str.replace(/\s+/g, '');
    }
}

export default Processing;
