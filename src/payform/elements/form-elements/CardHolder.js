export default class CardHolder {
    constructor(errorClass, focusClass) {
        this.errorClass = errorClass;
        this.focusClass = focusClass;

        this.element = document.querySelector('#card-holder');
        this.element.onfocus = () => this.element.parentNode.classList.add(this.focusClass);
        this.element.onblur = () => this.element.parentNode.classList.remove(this.focusClass);
    }

    get value() {
        return this.element.value;
    }

    validate() {
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
