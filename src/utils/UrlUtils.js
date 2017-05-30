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
        return JSON.parse(`{"${decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"')}"}`);
    }
}