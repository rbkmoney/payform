import template from './checkoutTemplate';

export default class CheckoutModal {

    constructor() {
        const modal = document.createElement('div');
        modal.innerHTML = template;
        this.element = modal;
    }

    render() {
        return new Promise(resolve => {
            document.body.appendChild(this.element);
            resolve();
        });
    }
}
