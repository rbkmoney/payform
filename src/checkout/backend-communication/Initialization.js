const errorMassage = 'An error occurred while trying send request to init endpoint';

export default class Initialization {

    static sendInit(endpoint, invoiceId, token, email) {
        const request = this.buildRequest(invoiceId, token, email);
        return new Promise((resolve, reject) => {
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    resolve();
                } else {
                    reject({message: errorMassage});
                }
            }).catch(() => {
                reject({message: errorMassage});
            })
        });
    }

    static buildRequest(invoiceId, token, email) {
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
