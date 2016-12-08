export default class PayButton {
    constructor() {
        this.element = document.querySelector('.payform--pay-button');
        this.disable();
    }

    renderText(amount, currency) {
        const renderAmount = amount || '';
        const renderCurrency = currency || '';
        this.element.innerText = `Оплатить ${renderAmount}${renderCurrency}`;
    }

    setPayButtonColor(color) {
        this.element.style.background = color;
    }

    disable() {
        this.element.setAttribute('disabled', 'true');
    }

    enable() {
        this.element.removeAttribute('disabled');
    }

    set onclick(handler) {
        this.element.onclick = handler;
    }
}
