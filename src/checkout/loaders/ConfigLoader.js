import 'whatwg-fetch';
import Utils from '../../utils/Utils';

export default class ConfigLoader {
    static load() {
        return new Promise((resolve, reject) => {
            fetch(`${Utils.getOriginUrl()}/appConfig.json`, {
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
