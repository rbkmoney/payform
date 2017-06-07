export default class UriSerializer {

    static serialize(params) {
        let urlParams = '';
        for (const prop in params) {
            if (params.hasOwnProperty(prop)) {
                const value = params[prop];
                if (typeof value === 'function') {
                    continue;
                }
                if (urlParams != '') {
                    urlParams += '&';
                }
                urlParams += `${prop}=${encodeURIComponent(value)}`;
            }
        }
        return urlParams;
    }

    static deserialize(url) {
        const search = url.split('?')[1];
        const obj = JSON.parse(`{"${decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                switch (obj[prop]) {
                    case 'true':
                        obj[prop] = true;
                        break;
                    case 'false':
                        obj[prop] = false;
                }
            }
        }
        return obj;
    }
}
