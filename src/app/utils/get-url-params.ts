import { splitByFirst } from './split-by-first';

interface URLParams {
    [param: string]: boolean | string | number | null | undefined;
}

const decodeURIWithLogError = (uri: string): string => {
    try {
        return decodeURI(uri);
    } catch (e) {
        console.error(e);
        return uri;
    }
};

const decodeURIComponentWithLogError = (value: string): string => {
    try {
        return decodeURIComponent(value);
    } catch (e) {
        console.error(e);
        return value;
    }
};

export const getUrlParams = (url: string): URLParams => {
    const params: URLParams = {};
    if (url && typeof url === 'string') {
        const decodedUrl = decodeURIWithLogError(url);
        const urlParts = splitByFirst(decodedUrl, '?');
        if (urlParts[1]) {
            const paramsStr = urlParts[1];
            const paramsPartsStr = paramsStr.split('&');
            for (const paramStr of paramsPartsStr) {
                const [encodedName, encodedValue] = splitByFirst(paramStr, '=') as [string, string | undefined];
                const name = decodeURIComponentWithLogError(encodedName);
                const value = decodeURIComponentWithLogError(encodedValue);
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
