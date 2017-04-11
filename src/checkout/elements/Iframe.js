import iframeStyles from './iframeStyles';
import Utils from '../../utils/Utils';

export default class Iframe {
    constructor(params) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `${params.payformHost}/payframe/payframe.html?${Utils.objectToParams(params)}`);
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
    }

    disable3DS() {
    }

    getName() {
        return this.element.getAttribute('name');
    }

    getSrc() {
        return this.element.getAttribute('src');
    }
}
