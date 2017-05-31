export default function(params) {
    const obj = params;

    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] === 'undefined') {
                delete obj[prop];
            }
        }
    }

    return obj;
}