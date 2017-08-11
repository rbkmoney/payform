function validateMerchant(validationEndpoint, validationURL) {
    return new Promise((resolve) => {
        fetch(`${validationEndpoint}/getApplePaySessionProxy`, {
            method: 'POST',
            body: JSON.stringify({
                url: validationURL
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                resolve(response.json());
            }
        });
    });
}

export default validateMerchant;
