export default class PayButton {
    constructor(text) {
        const span = document.createElement('span');
        span.innerHTML = text;
        const button = document.createElement('button');
        button.className = 'rbkmoney-button';
        button.appendChild(span);
        this.element = button;
    }

    render() {
        document.body.appendChild(this.element);
    }
}
