export default class Form {

    constructor(selector) {
        this.selector = selector;
        const element = document.createElement('div');
        element.setAttribute('class', this.selector);
        element.innerHTML = `
            <form role="form">
                <fieldset class="payform--fieldset">
                    <div class="payform--group payform--card-number">
                        <input id="card-number" type="tel" value="" placeholder='Card number' autocomplete='off' autocorrect='no' autocapitalize='no' spellcheck='no'>
                    </div>
                </fieldset>
                <fieldset class="payform--fieldset">CONTENT</fieldset>
                <fieldset class="payform--fieldset">CONTENT</fieldset>
            </form>`;
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
