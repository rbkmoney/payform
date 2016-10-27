export default class Utils {
    static getScriptUrl() {
        const scripts = document.getElementsByTagName('script');
        const element = scripts[scripts.length - 1];
        return element.src;
    }

    static getOriginUrl(url) {
        const parser = document.createElement('a');
        parser.href = url;
        return parser.origin;
    }
}
