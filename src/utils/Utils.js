export default class Utils {
    static getOriginUrl(url) {
        const parser = document.createElement('a');
        parser.href = url;
        return parser.origin;
    }
}
