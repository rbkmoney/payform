import CardUtils from '../../../utils/card-utils/CardUtils';

class PayformValidation {

    constructor(state) {
        this.state = state;
    }

    validate() {
        const isCardHolderValid = this.validateCardHolder();
        const isCardNumberValid = this.validateCardNumber();
        const isCardExpireValid = this.validateCardExpire();
        const isCardCvvValid = this.validateCardCvv();
        const isEmailValid = this.validateEmail();
        const isAmountValid = this.validateAmount();
        return isCardHolderValid
            && isCardNumberValid
            && isCardExpireValid
            && isCardCvvValid
            && isEmailValid
            && isAmountValid;
    }

    validateCardHolder() {
        const isValid = CardUtils.validateCardHolder(this.state.cardHolder.value);
        PayformValidation.assignValid(this.state.cardHolder, isValid);
        return isValid;
    }

    validateCardNumber() {
        const isValid = CardUtils.validateCardNumber(this.state.cardNumber.value);
        PayformValidation.assignValid(this.state.cardNumber, isValid);
        return isValid;
    }

    validateCardExpire() {
        const isValid = CardUtils.validateCardExpiry(this.state.cardExpire.value);
        PayformValidation.assignValid(this.state.cardExpire, isValid);
        return isValid;
    }

    validateCardCvv() {
        const isValid = CardUtils.validateCardCvv(this.state.cardCvv.value, CardUtils.cardType(this.state.cardNumber.value));
        PayformValidation.assignValid(this.state.cardCvv, isValid);
        return isValid;
    }

    validateEmail() {
        const isValid = CardUtils.validateEmail(this.state.email.value);
        PayformValidation.assignValid(this.state.email, isValid);
        return isValid;
    }

    validateAmount() {
        if (!this.state.amount.isRequired) {
            return true;
        }
        const isValid = CardUtils.validateAmount(this.state.amount.value);
        PayformValidation.assignValid(this.state.amount, isValid);
        return isValid;
    }

    static assignValid(prop, value) {
        return Object.assign(prop, {
            isValid: value
        })
    }
}

export default PayformValidation;
