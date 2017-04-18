import URL from 'url-parse';

export default class Utils {

    static getOriginUrl(url) {
        const parsedUrl = new URL(url);
        return parsedUrl.origin;
    }

    static isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }
}
