export const deserialize = (url: string): any => {
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
            } else if (value !== '' && !isNaN(value as any)) {
                result[prop] = parseFloat(value);
            } else {
                result[prop] = value;
            }
        }
    }
    return result;
};
