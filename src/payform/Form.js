export default class Form {

    static getEmail() {
        return this.getInputValue('#email');
    }

    static getCardHolder() {
        return this.getInputValue('#card-holder');
    }

    static getCardNumber() {
        return this.getInputValue('#card-number');
    }

    static getExpDate() {
        return this.getInputValue('#exp-date');
    }

    static getCvv() {
        return this.getInputValue('#cvv');
    }

    static getInputValue(id) {
        return document.querySelector(id).value
    }
}
