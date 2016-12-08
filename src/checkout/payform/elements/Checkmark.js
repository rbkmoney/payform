export default class Checkmark {

    constructor() {
        this.element = document.querySelector('.checkmark');
        this.hide();
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}
