export default class Tokenization {

    constructor(tokenizer) {
        this.Tokenizer = tokenizer;
    }

    setPublicKey(key) {
        this.Tokenizer.setPublicKey(key);
    }

    createToken(cardHolder, cardNumber, expDate, cvv) {
        const request = Tokenization.buildRequest(cardHolder, cardNumber, expDate, cvv);
        const tokenizer = this.Tokenizer;
        return new Promise((resolve, reject) => {
            tokenizer.card.createToken(
                request,
                paymentTools => resolve(paymentTools),
                () => reject({message: 'An error occurred while trying tokenize cart'})
            );
        });
    }

    static buildRequest(cardHolder, cardNumber, expDate, cvv) {
        return {
            paymentToolType: 'CardData',
            cardHolder: cardHolder,
            cardNumber: Tokenization.replaceSpaces(cardNumber),
            expDate: Tokenization.replaceSpaces(expDate),
            cvv: cvv
        }
    }

    static replaceSpaces(str) {
        return str.replace(/\s+/g, '');
    }
}
