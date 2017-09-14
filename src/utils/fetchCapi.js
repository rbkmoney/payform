import guid from './guid';

/**
 * @param {Object} param
 * @param {string} param.endpoint
 * @param {string} param.accessToken
 * @param {string} [param.method=GET,POST,PUT]
 * @param {Object} [param.body]
 * @return {Promise<Object>} capiResponse
 */
function fetchCapi(param) {
    return new Promise((resolve, reject) => {
        fetch(param.endpoint, {
            method: param.method || 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${param.accessToken}`,
                'X-Request-ID': guid()
            },
            body: param.body ? JSON.stringify(param.body) : undefined
        }).then((response) => {
            if (response.status >= 200 && response.status <= 300) {
                resolve(response.json());
            } else {
                response.json()
                    .then((error) => reject(error))
                    .catch(() => reject(response));
            }
        }).catch((error) => reject(error));
    });
}

export default fetchCapi;
