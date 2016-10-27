export default class PayButton {
    constructor() {
        this.element = document.querySelector('.payform--pay-button');
    }

    renderText(amount, currency) {
        let renderAmount = amount || '';
        let renderCurrency = currency || '';
        this.element.innerText = `Оплатить ${renderAmount}${renderCurrency}`;
    }

    setPayButtonColor(color) {
        this.element.style.background = color;
    }
}
