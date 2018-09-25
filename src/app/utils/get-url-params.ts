interface URLParams {
    [param: string]: string;
}

function splitByFirst(str: string, sep: string): [string] | [string, string] {
    const firstSepIdx = str.indexOf(sep);
    return firstSepIdx === -1 ? [str] : [str.slice(0, firstSepIdx), str.slice(firstSepIdx + 1)];
}

export const getUrlParams = (url: string): URLParams => {
    const params: URLParams = {};
    if (url && typeof url === 'string') {
        const decodedUrl = decodeURI(url);
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
