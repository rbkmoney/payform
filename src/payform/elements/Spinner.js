export default class Spinner {
    constructor(spinnerSelector, formSelector) {
        this.element = document.querySelector(spinnerSelector);
        this.element.style.display = 'none';
        this.form = document.querySelector(formSelector);
    }

    show() {
        this.form.style.display = 'none';
        this.element.style.display = 'block';
    }

    hide() {
        this.form.style.display = 'block';
        this.element.style.display = 'none';
    }
}
