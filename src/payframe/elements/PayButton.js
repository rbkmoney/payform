import settings from '../../settings';

export default class PayButton {
    constructor(text, color) {
        const span = document.createElement('span');
        span.innerHTML = text;
        if (color) {
            span.style.background = color;
        }
        const button = document.createElement('button');
        button.className = 'rbkmoney-button';
        button.appendChild(span);
        this.element = button;
    }

    render() {
        const appendNode = document.querySelector(`.${settings.integrationClassName}`);
        if (appendNode) {
            appendNode.parentNode.appendChild(this.element);
        } else {
            console.error('append node is null');
        }
    }

    set onclick(handler) {
        this.element.onclick = handler;
    }
}
