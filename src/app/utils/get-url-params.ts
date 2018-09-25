import { splitByFirst } from './split-by-first';

interface URLParams {
    [param: string]: boolean | string | number | null | undefined;
}

export const getUrlParams = (url: string): URLParams => {
    const params: URLParams = {};
    if (url && typeof url === 'string') {
        let decodedUrl;
        try {
            decodedUrl = decodeURI(url);
        } catch (e) {
            console.error(e);
            decodedUrl = url;
        }
        const urlParts = splitByFirst(decodedUrl, '?');
        if (urlParts[1]) {
            const paramsStr = urlParts[1];
            const paramsPartsStr = paramsStr.split('&');
            for (const paramStr of paramsPartsStr) {
                const [encodedName, encodedValue] = splitByFirst(paramStr, '=') as [string, string | undefined];
                let name;
                try {
                    name = decodeURIComponent(encodedName);
                } catch (e) {
                    console.error(e);
                    name = encodedName;
                }
                let value;
                try {
                    value = decodeURIComponent(encodedValue);
                } catch (e) {
                    console.error(e);
                    value = encodedValue;
                }
                switch (value) {
                    case 'true':
                        params[name] = true;
                        break;
                    case 'false':
                        params[name] = false;
                        break;
                    case 'undefined':
                        params[name] = undefined;
                        break;
                    case 'null':
                        params[name] = null;
                        break;
                    default:
                        if (value !== '' && !isNaN(value as any)) {
                            params[name] = parseFloat(value);
                            break;
                        }
                        params[name] = value;
                        break;
                }
            }
        }
    }
    return params;
};
