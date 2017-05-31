export default class UrlUtils {
    static encodeParams(params) {
        let urlParams = '';
        for (const prop in params) {
            if (params.hasOwnProperty(prop)) {
                if (urlParams != '') {
                    urlParams += '&';
                }
                urlParams += `${prop}=${encodeURIComponent(params[prop])}`;
            }
        }
        return urlParams;
    }

    static decodeParams(url) {
        const search = url.split('?')[1];
        const obj = JSON.parse(`{"${decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"')}"}`);

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