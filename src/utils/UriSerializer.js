export default class UriSerializer {

    static serialize(params) {
        let urlParams = '';
        for (const prop in params) {
            if (params.hasOwnProperty(prop)) {
                const value = params[prop];
                if ((typeof value === 'function') || (value === undefined) || (value === null)) {
                    continue;
                }
                if (urlParams !== '') {
                    urlParams += '&';
                }
                urlParams += `${prop}=${encodeURIComponent(value)}`;
            }
        }
        return urlParams;
    }

    static deserialize(url) {
        const split = (typeof url === 'string' && url !== '') && url.split('?');
        if (!split) {
            return {};
        }
        const params = split.length > 1 ? split[1] : split[0];
        const result = JSON.parse(`{"${decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
        for (const prop in result) {
            if (result.hasOwnProperty(prop)) {
                const value = decodeURIComponent(result[prop]);
                if (value === 'true') {
                    result[prop] = true;
                } else if (value === 'false') {
                    result[prop] = false;
                } else if (value === 'undefined') {
                    result[prop] = undefined;
                } else if (value === 'null') {
                    result[prop] = null;
                } else if (value !== '' && !isNaN(value)) {
                    result[prop] = parseFloat(value);
                } else {
                    result[prop] = value;
                }
            }
        }
        return result;
    }
}
