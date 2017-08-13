function validateMerchant(validationEndpoint, merchantID, domain) {
    return new Promise((resolve, reject) => {
        fetch(`${validationEndpoint}/validate-merchant`, {
            method: 'POST',
            body: JSON.stringify({
                merchantIdentifier: merchantID,
                domainName: domain,
                displayName: 'RBKmoney Checkout'
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((response) => {
            if (response.status === 200) {
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
