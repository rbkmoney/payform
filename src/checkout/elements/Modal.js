export default class Modal {

    constructor() {
        const modal = document.createElement('div');
        modal.setAttribute('class', 'modal');
        modal.innerHTML = `
            <div class="modal--overlay"></div>
            <div class="modal--container">
                <checkout-modal-close></checkout-modal-close>
                <div class="modal--body">
                    <checkout-container></checkout-container>
                </div>
            </div>`;
        this.element = modal;
    }

    render() {
        return new Promise(resolve => {
            document.getElementsByTagName('body')[0].appendChild(this.element);
            resolve();
        });
    }


}
