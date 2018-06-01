import assign from 'lodash-es/assign';

const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

const generateId = () => `${s4()}${s4()}${s4()}${s4()}`;

const styles = {
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
    zIndex: 2147483647
};

const create = (origin: string): HTMLIFrameElement => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `${origin}/v1/checkout.html`);
    iframe.setAttribute('name', `rbkmoney-payframe-${generateId()}`);
    iframe.setAttribute('class', 'rbkmoney-payframe');
    iframe.setAttribute('allowtransparency', 'true');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowpaymentrequest', '');
    assign(iframe.style, styles);
    return iframe;
};

export class IframeContainer {

    private container: HTMLIFrameElement;

    constructor(origin: string) {
        this.container = create(origin);
        this.render();
    }

    reinitialize() {
        this.hide();
        this.destroy();
        this.render();
    }

    render() {
        document.body.appendChild(this.container);
    }

    destroy() {
        document.body.removeChild(this.container);
    }

    show() {
        this.container.style.display = 'block';
    }

    hide() {
        this.container.style.display = 'none';
    }

    getName(): string {
        return this.container.getAttribute('name');
    }
}
