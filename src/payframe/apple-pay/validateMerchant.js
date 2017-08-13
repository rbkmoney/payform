function validateMerchant(validationEndpoint) {
    return new Promise((resolve, reject) => {
        fetch(`${validationEndpoint}/validate-merchant`, {
            method: 'POST',
            // TODO fix it
            body: JSON.stringify({
                merchantIdentifier: 'merchant.money.rbk.checkout',
                domainName: 'applefags.rbkmoney.com',
                displayName: 'RBKmoney Checkout'
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                resolve(response.json());
            } else {
                response.json()
                    .then((error) => reject(error))
                    .catch(() => reject(response));
            }
        }).catch((error) => reject(error));
    });
}

export default validateMerchant;
