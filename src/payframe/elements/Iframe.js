import iframeStyles from './iframeStyles';

export default class Iframe {
    constructor(host) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `${host}/checkout/checkout.html`);
        iframe.setAttribute('name', 'rbkmoney_payframe');
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('frameborder', '0');
        Object.assign(iframe.style, iframeStyles);
        this.element = iframe;
    }

    render() {
        document.body.appendChild(this.element);
    }

    destroy() {
        document.body.removeChild(this.element);
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }

    getName() {
        return this.element.getAttribute('name');
    }

    getSrc() {
        return this.element.getAttribute('src');
    }
}
