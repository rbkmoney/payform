import CardUtils from '../../../utils/card-utils/CardUtils';

export default class CardNumber {
    constructor(errorClass, focusClass) {
        this.errorClass = errorClass;
        this.focusClass = focusClass;

        this.element = document.querySelector('#card-number');
        this.element.onfocus = () => this.element.parentNode.classList.add(this.focusClass);
        this.element.onblur = () => this.element.parentNode.classList.remove(this.focusClass);
        CardUtils.formatCardNumber(this.element);
    }

    get value() {
        return this.element.value;
    }

    validate() {
        // const isValid = $.payment.validateCardNumber(this.value);
        let isValid = false;
        const value = this.element.value;
        if (value && value.trim() !== '') {
            isValid = true
        }
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
