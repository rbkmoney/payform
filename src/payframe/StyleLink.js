export default class StyleLink {
    constructor(href) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', href);
        document.getElementsByTagName('head')[0].appendChild(link);
        this.element = link;
    }
}
