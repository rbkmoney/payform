export default class Communicator {

    static sendTokenization(endpoint, data) {
        return new Promise((resolve, reject) => {
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response.json());
                } else {
                    response.json().then(error => reject(error));
                }
            }).catch(() => reject('Error send to tokenization endpoint'));
        });
    }
}
