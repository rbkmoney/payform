export default class Email {
    constructor(errorClass, focusClass) {
        this.errorClass = errorClass;
        this.focusClass = focusClass;

        this.element = document.querySelector('#email');
        this.element.onfocus = () => this.element.parentNode.classList.add(this.focusClass);
        this.element.onblur = () => this.element.parentNode.classList.remove(this.focusClass);
    }

    get value() {
        return this.element.value;
    }

    validate() {
        const value = this.element.value;
        const emailRegExp = new RegExp('^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.' +
            '(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.' +
            '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$');
        const isValid = emailRegExp.test(value.trim());
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

