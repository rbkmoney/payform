export default class StyleLink {
    constructor() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'payframe.css');
        this.element = link;
    }

    render() {
        document.getElementsByTagName('head')[0].appendChild(this.element);
    }

    rerender() {
        this.element.href = this.element.href;
    }
}
