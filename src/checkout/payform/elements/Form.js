import CardNumber from './form-elements/CardNumber';
import ExpDate from './form-elements/ExpDate';
import Cvv from './form-elements/Cvv';
import CardHolder from './form-elements/CardHolder';
import Email from './form-elements/Email';

export default class Form {
    constructor() {
        this.errorClass = 'payform--field__error';
        this.focusClass = 'payform--field__focus';

        this.element = document.querySelector('#payform');

        this.email = new Email(this.errorClass, this.focusClass);
        this.cardHolder = new CardHolder(this.errorClass, this.focusClass);
        this.cardNumber = new CardNumber(this.errorClass, this.focusClass);
        this.expDate = new ExpDate(this.errorClass, this.focusClass);
        this.cvv = new Cvv(this.errorClass, this.focusClass);
    }

    setLogo(url) {
        this.logo = document.querySelector('.payform--logo-image');
        this.logo.style.backgroundImage = 'url("' + url + '")';
    }

    setName(name) {
        this.name = document.querySelector('.payform--company-name');
        this.name.innerHTML = name;
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

    validateEmail() {
        return this.email.validate();
    }

    getCardHolder() {
        return this.cardHolder.value;
    }

    validateCardHolder() {
        return this.cardHolder.validate();
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
        return this.cvv.value;
    }

    validateCvv() {
        return this.cvv.validate(this.cardNumber.value);
    }

    isValid() {
        const isCardHolderValidate = this.validateCardHolder();
        const isCardNumberValid = this.validateCardNumber();
        const isExpDateValid = this.validateExpDate();
        const isCvvValid = this.validateCvv();
        const isEmailValidate = this.validateEmail();
        return isCardHolderValidate && isCardNumberValid && isExpDateValid && isCvvValid && isEmailValidate;
    }
}
