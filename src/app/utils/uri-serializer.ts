export const deserialize = (url: string): any => {
    if (url.indexOf('=') === -1 || typeof url !== 'string' || !url.length) {
        return {};
    }
    const split = url.split('?');
    const params = split.length > 1 ? split[1] : split[0];
    const preparedParams = decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"');
    const result = JSON.parse(`{"${preparedParams}"}`);
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
            } else if (value !== '' && !isNaN(value as any)) {
                result[prop] = parseFloat(value);
            } else {
                result[prop] = value;
            }
        }
    }
    return result;
};
