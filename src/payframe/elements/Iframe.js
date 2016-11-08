import iframeStyles from './iframeStyles';

export default class Iframe {
    constructor(src, name) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', src);
        iframe.setAttribute('name', name);
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
}
