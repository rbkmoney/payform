import 'whatwg-fetch';

export default class ConfigLoader {
    static load(url) {
        return new Promise((resolve, reject) => {
            fetch(`${url}/appConfig.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response.json());
                } else {
                    reject(response);
                }
            });
        });
    }
}
