export const validateMerchant = (endpoint: string, payload: ApplePayPayload, validationURL: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        fetch(`${endpoint}/api/v1/session`, {
            method: 'POST',
            body: JSON.stringify({
                merchantId: payload.merchantIdentifier,
                validationURL,
                body: payload
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((res) =>
                res.status === 200
                    ? resolve(res.json())
                    : res
                          .json()
                          .then((ex) => reject(ex))
                          .catch(() =>
                              reject({
                                  message: `${res.status}: ${res.statusText}`
                              })
                          )
            )
            .catch((ex) => reject({ message: `${ex}` }));
    });
};
