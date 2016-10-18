export default class Utils {
    static getScriptUrl() {
        const scripts = document.getElementsByTagName('script');
        const element = scripts[scripts.length - 1];
        return element.src;
    }

    static getOriginUrl() {
        const parser = document.createElement('a');
        parser.href = this.getScriptUrl();
        return parser.origin;
    }
}
