export default class CloseButton {

    constructor(selector) {
        this.selector = selector;
        const element = document.createElement('div');
        element.setAttribute('class', this.selector);
        element.innerHTML = `<div class="modal--close"></div>`;
        this.element = element;
    }

    render() {
        return new Promise(resolve => {
            const insertEl = document.querySelector(this.selector);
            insertEl.parentNode.replaceChild(this.element, insertEl);
            resolve();
        });
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
