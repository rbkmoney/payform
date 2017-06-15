import Tokenization from './Tokenization';
import PaymentCreator from './PaymentCreator';
import EventPoller from './EventPoller';

class Processing {

    static process(params) {
        const tokenization = new Tokenization();
        tokenization.setAccessToken(params.invoiceAccessToken);
        return tokenization.createToken(params.cardHolder, params.cardNumber, params.cardExpire, params.cardCvv).then(paymentTools => {
            return PaymentCreator.create(params.capiEndpoint, params.invoiceID, params.invoiceAccessToken, paymentTools, params.email).then(() => {
                return EventPoller.pollEvents(params.capiEndpoint, params.invoiceID, params.invoiceAccessToken);
            });
        });
    }
}

export default Processing;
