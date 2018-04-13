export const validateMerchant = (endpoint: string, payload: ApplePayPayload): Promise<any> => {
    return new Promise((resolve, reject) => {
        fetch(`${endpoint}/validate-merchant`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((res) => res.status === 200
            ? resolve(res.json())
            : res.json()
                .then((ex) => reject(ex))
                .catch(() => reject({
                    message: `${res.status}: ${res.statusText}`
                }))
        ).catch((ex) => reject({message: `${ex}`}));
    });
};
