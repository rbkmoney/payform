export default class RequestBuilder {

    static buildTokenizationRequest(cardHolder, cardNumber, expDate, cvv) {
        return {
            paymentToolType: 'CardData',
            cardHolder: cardHolder,
            cardNumber: this.replaceSpaces(cardNumber),
            expDate: this.replaceSpaces(expDate),
            cvv: cvv
        }
    }

    static buildInitRequest(invoiceId, token, email) {
        return {
            invoiceId: invoiceId,
            token: token.token,
            session: token.session,
            contractInfo: {
                email: email
            }
        }
    }

    static replaceSpaces(str) {
        return str.replace(/\s+/g, '');
    }
}
