export default class PayButton {
    constructor(text, color) {
        const span = document.createElement('span');
        span.innerHTML = text;
        if(color) {
            span.style.background = color;
        }
        const button = document.createElement('button');
        button.className = 'rbkmoney-button';
        button.appendChild(span);
        this.element = button;
    }

    render(className) {
        document.querySelector(`.${className}`).parentNode.appendChild(this.element);
    }
}
