export default class RequestBuilder {

    static buildTokenizationRequest(cardHolder, cardNumber, expDate, cvv) {
        return {
            paymentToolType: 'CardData',
            cardHolder: cardHolder,
            cardNumber: cardNumber,
            expDate: expDate,
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
}
