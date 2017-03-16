import settings from '../../settings';

export default class PayButton {
    constructor(text) {
        const button = document.createElement('button');
        button.className = 'rbkmoney-button';
        button.innerHTML = text;
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
