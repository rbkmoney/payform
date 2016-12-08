export default class Utils {

    static getOriginUrl(url) {
        const parser = document.createElement('a');
        parser.href = url;
        return parser.origin;
    }

    static isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }
}
