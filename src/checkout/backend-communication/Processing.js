import Tokenization from './Tokenization';
import Initialization from './Initialization';
import EventPoller from './EventPoller';

class Processing {

    static process(params) {
        const tokenization = new Tokenization(params.tokenizer);
        tokenization.setPublicKey(params.publicKey);
        return new Promise((resolve, reject) => {
            tokenization.createToken(params.cardHolder, params.cardNumber, params.cardExpire, params.cardCvv).then(paymentTools => {
                Initialization.sendInit(params.endpointInit, params.invoiceId, paymentTools, params.email).then(() => {
                    EventPoller.pollEvents(params.endpointEvents, params.invoiceId, params.orderId).then(result => {
                        resolve(result);
                    }).catch(error => reject(error));
                }).catch(error => reject(error));
            }).catch(error => reject(error));
        });
    }
}

export default Processing;
