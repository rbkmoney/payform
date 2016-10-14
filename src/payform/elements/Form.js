import CardNumber from './form-elements/CardNumber';
import ExpDate from './form-elements/ExpDate';

export default class Form {
    constructor() { //TODO fix it
        this.errorClass = 'payform--field__error';
        this.focusClass = 'payform--field__focus';
        
        this.element = document.querySelector('#payform');

        this.email = document.querySelector('#email');
        this.cardHolder = document.querySelector('#card-holder');

        this.cardNumber = new CardNumber(this.errorClass, this.focusClass);
        this.expDate = new ExpDate(this.errorClass, this.focusClass);

        this.cvv = $('#cvv');
        this.cvv.focus(() => {
            this.cvv.parent('.payform--group').toggleClass('payform--field__focus');
        }).focusout(() => {
            this.cvv.parent('.payform--group').toggleClass('payform--field__focus');
        });
        this.cvv.payment('formatCardCVC');
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }

    getEmail() {
        return this.email.value;
    }

    getCardHolder() {
        return this.cardHolder.value;
    }

    getCardNumber() {
        return this.cardNumber.value;
    }

    validateCardNumber() {
        return this.cardNumber.validate();
    }

    getExpDate() {
        return this.expDate.value;
    }

    validateExpDate() {
        return this.expDate.validate();
    }

    getCvv() {
        return this.cvv.val();
    }

    validateCvv() {
        const isValid = $.payment.validateCardCVC(this.getCvv());
        this.expDate.toggleInputError(!isValid);
        return isValid;
    }
}
