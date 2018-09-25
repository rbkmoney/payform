import { splitByFirst } from './split-by-first';

interface URLParams {
    [param: string]: string;
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
        const paramsStr = urlParts[urlParts[1] === undefined ? 0 : 1];
        const paramsPartsStr = paramsStr.split('&');
        for (const paramStr of paramsPartsStr) {
            const [name, value] = splitByFirst(paramStr, '=') as [string, string | undefined];
            params[name] = value;
        }
    }
    return params;
};
