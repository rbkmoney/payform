import iframeStyles from './iframeStyles';

export default class Iframe {
    constructor(host) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `${host}/payframe/payframe.html`);
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

    enable3DS() {
        this.element.style.borderRadius = '6px';
        this.element.style.boxShadow = '0 12px 30px 0 rgba(0,0,0,.6)';
        this.element.style.backgroundColor = '#FFFFFF';
    }

    disable3DS() {
        this.element.style.borderRadius = '0';
        this.element.style.boxShadow = 'none';
        this.element.style.backgroundColor = '';
    }

    getName() {
        return this.element.getAttribute('name');
    }

    getSrc() {
        return this.element.getAttribute('src');
    }
}
