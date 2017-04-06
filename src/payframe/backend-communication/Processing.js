import Tokenization from './Tokenization';
import PaymentCreator from './PaymentCreator';
import EventPoller from './EventPoller';

class Processing {

    static process(params) {
        const tokenization = new Tokenization(params.tokenizer);
        tokenization.setAccessToken(params.accessToken);
        return tokenization.createToken(params.cardHolder, params.cardNumber, params.cardExpire, params.cardCvv).then(paymentTools => {
            return PaymentCreator.create(params.capiEndpoint, params.invoiceId, params.accessToken, paymentTools, params.email).then(() => {
                return EventPoller.pollEvents(params.capiEndpoint, params.invoiceId, params.accessToken);
            });
        });
    }

    static pollEvents(params) {
        return new Promise((resolve, reject) => {
            EventPoller.pollEvents(params.capiEndpoint, params.invoiceId, params.accessToken).then(result => {
                resolve(result);
            }).catch(error => reject(error));
        })
    }
}

export default Processing;
