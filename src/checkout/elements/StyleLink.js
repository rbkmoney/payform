import '../checkout.scss';

export default class StyleLink {
    constructor(host) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', `${host}/checkout.css`);
        this.element = link;
    }

    render() {
        document.getElementsByTagName('head')[0].appendChild(this.element);
    }
}
