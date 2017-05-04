import iframeStyles from './iframeStyles';
import guid from '../../utils/guid';

export default class Iframe {
    constructor(params) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `${params.payformHost}/html/payframe.html`);
        iframe.setAttribute('name', `rbkmoney-payframe-${guid()}`);
        iframe.setAttribute('class', 'rbkmoney-payframe');
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