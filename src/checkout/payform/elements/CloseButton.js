export default class CloseButton {

    constructor() {
        this.element = document.querySelector('.modal--close');
    }

    set onclick(handler) {
        this.element.onclick = handler;
    }

    hide() {
        this.element.style.display = 'none';
    }

    show() {
        this.element.style.display = 'block';
    }
}
