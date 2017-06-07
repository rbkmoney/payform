export default class CheckoutButton {
    constructor(text, className) {
        this.className = className;
        const button = document.createElement('button');
        button.className = 'rbkmoney-button';
        button.innerHTML = text;
        this.element = button;
    }

    render() {
        const appendNode = document.querySelector(`.${this.className}`);
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
