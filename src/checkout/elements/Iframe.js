import guid from '../../utils/guid';

export default class Iframe {
    constructor(payformHost) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `${payformHost}/html/payframe.html`);
        iframe.setAttribute('name', `rbkmoney-payframe-${guid()}`);
        iframe.setAttribute('class', 'rbkmoney-payframe');
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('frameborder', '0');
        Object.assign(iframe.style, {
            overflowX: 'hidden',
            overflowY: 'auto',
            visibility: 'visible',
            border: '0 none transparent',
            display: 'none',
            margin: '0px',
            padding: '0px',
            position: 'fixed',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            zIndex: 9999
        });
        this.element = iframe;
        this.render();
    }

    reinitialize() {
        this.hide();
        this.destroy();
        this.render();
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
}
