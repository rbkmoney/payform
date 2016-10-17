export default class ExpDate {
    constructor(errorClass, focusClass) {
        this.errorClass = errorClass;
        this.focusClass = focusClass;

        this.element = document.querySelector('#exp-date');
        this.element.onfocus = () => this.element.parentNode.classList.add(this.focusClass);
        this.element.onblur = () => this.element.parentNode.classList.remove(this.focusClass);
        $('#exp-date').payment('formatCardExpiry');
    }

    get value() {
        return this.element.value;
    }

    validate() {
        const isValid = $.payment.validateCardExpiry($('#exp-date').payment('cardExpiryVal'));
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
