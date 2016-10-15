export default class Cvv {
    constructor(errorClass, focusClass) {
        this.errorClass = errorClass;
        this.focusClass = focusClass;

        this.element = document.querySelector('#cvv');
        this.element.onfocus = () => this.element.parentNode.classList.add(this.focusClass);
        this.element.onblur = () => this.element.parentNode.classList.remove(this.focusClass);
        $('#cvv').payment('formatCardCVC');
    }

    get value() {
        return this.element.value;
    }

    validate(cardNumber) {
        const cardType = $.payment.cardType(cardNumber);
        const isValid = $.payment.validateCardCVC(this.value, cardType);
        const classList = this.element.parentNode.classList;
        if (!isValid) {
            classList.add(this.focusClass);
            classList.add(this.errorClass);
        } else {
            classList.remove(this.focusClass);
            classList.remove(this.errorClass);
        }
        return isValid;
    }
}
