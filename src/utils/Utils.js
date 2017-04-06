export default class Utils {

    static getOriginUrl(url) {
        const parser = document.createElement('a');
        parser.href = url;
        return parser.origin;
    }

    static isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    static objectToParams(obj) {
        let str = '';
        for (const key in obj) {
            if (str !== '') {
                str += '&';
            }
            str += key + '=' + obj[key];
        }

        return str;
    }
}
