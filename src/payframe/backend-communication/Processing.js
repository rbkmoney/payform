import Tokenization from './Tokenization';
import PaymentCreator from './PaymentCreator';
import EventPoller from './EventPoller';

class Processing {

    static process(params, locale) {
        const tokenization = new Tokenization(locale);
        tokenization.setAccessToken(params.invoiceAccessToken);
        return tokenization.createToken(params.cardHolder, params.cardNumber, params.cardExpire, params.cardCvv).then(paymentTools => {
            return PaymentCreator.create(params.capiEndpoint, params.invoiceID, params.invoiceAccessToken, paymentTools, params.email, locale).then(() => {
                return EventPoller.pollEvents(params.capiEndpoint, params.invoiceID, params.invoiceAccessToken, locale);
            });
        });
    }
}

export default Processing;
