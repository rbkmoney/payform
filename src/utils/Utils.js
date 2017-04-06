export default class Utils {

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
