export default class Error {

    constructor() {
        this.element = document.querySelector('.error-panel');
        this.hide();
    }

    show(text) {
        this.element.style.display = 'block';
        this.element.innerText = text || 'error';
    }

    hide() {
        this.element.style.display = 'none';
    }
}
