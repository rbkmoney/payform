export default class Spinner {

    constructor() {
        this.element = document.querySelector('.spinner');
        this.hide();
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}
