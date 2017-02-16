import iframeStyles from './iframeStyles';
import iframeContainerStyles from './iframeContainerStyles';

export default class Iframe {
    constructor(host) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `${host}/checkout/checkout.html`);
        iframe.setAttribute('name', 'rbkmoney_payframe');
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('frameborder', '0');
        Object.assign(iframe.style, iframeStyles);
        this.element = iframe;

        const container = document.createElement('div');
        Object.assign(container.style, iframeContainerStyles);
        this.container = container;
    }

    render() {
        document.body.appendChild(this.container);
        this.container.appendChild(this.element);
    }

    destroy() {
        document.body.removeChild(this.container);
    }

    show() {
        this.container.style.display = 'block';
        this.element.style.display = 'block';
    }

    hide() {
        this.container.style.display = 'none';
        this.element.style.display = 'none';
    }

    enable3DS() {
        this.element.style.borderRadius = '6px';
        this.element.style.boxShadow = '0 12px 30px 0 rgba(0,0,0,.6)';
    }

    disable3DS() {
        this.element.style.borderRadius = '0';
        this.element.style.boxShadow = 'none';
    }

    getName() {
        return this.element.getAttribute('name');
    }

    getSrc() {
        return this.element.getAttribute('src');
    }
}
