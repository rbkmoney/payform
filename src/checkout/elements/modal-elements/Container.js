export default class Container {

    constructor(selector) {
        this.selector = selector;
        const element = document.createElement('div');
        element.setAttribute('class', this.selector);
        element.innerHTML = `
            <div class="modal--body">
                <div class="payform">
                    <div class="payform--header">
                        <div class="payform--logo">
                            <div class="payform--logo-image"></div>
                        </div>
                        <div class="payform--company-name"></div>
                        <div class="payform--form">
                            <checkout-form></checkout-form>
                        </div>
                    </div>
                </div>
            </div>`;
        this.element = element;
    }

    render() {
        return new Promise(resolve => {
            const insertEl = document.querySelector(this.selector);
            insertEl.parentNode.replaceChild(this.element, insertEl);
            resolve();
        });
    }
}
