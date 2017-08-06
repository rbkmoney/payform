import {
    UPDATE_CONTAINER_SIZE,
    SET_DEFAULT_EMAIL,
    SET_CARD_NUMBER_VALUE,
    SET_CARD_EXP_VALUE,
    SET_CARD_CVV_VALUE,
    SET_CARD_HOLDER_VALUE,
    SET_EMAIL_VALUE, VALIDATE_FORM
} from '../constants/viewData';
import CardUtils from '../../utils/card-utils/CardUtils';

function updateContainerSize(size) {
    return {
        type: UPDATE_CONTAINER_SIZE,
        payload: {
            containerSize: size
        }
    };
}

function setDefaultEmail(email) {
    return {
        type: SET_DEFAULT_EMAIL,
        payload: {
            defaultEmail: CardUtils.validateEmail(email) && email
        }
    };
}

function setCardNumberVal(value) {
    return {
        type: SET_CARD_NUMBER_VALUE,
        payload: {
            value: value
        }
    };
}

function setCardExpireVal(value) {
    return {
        type: SET_CARD_EXP_VALUE,
        payload: {
            value: value
        }
    };
}

function setCardCvvVal(value) {
    return {
        type: SET_CARD_CVV_VALUE,
        payload: {
            value: value
        }
    };
}

function setCardHolderVal(value) {
    return {
        type: SET_CARD_HOLDER_VALUE,
        payload: {
            value: value
        }
    };
}

function setEmailVal(value) {
    return {
        type: SET_EMAIL_VALUE,
        payload: {
            value: value
        }
    };
}

function validateForm(form) {
    const isCardHolderValid = CardUtils.validateCardHolder(form.cardHolder.value);
    const isCardNumberValid = CardUtils.validateCardNumber(form.cardNumber.value);
    const isCardExpiryValid = CardUtils.validateCardExpiry(form.cardExpire.value);
    const isCardCvvValid = CardUtils.validateCardCvv(form.cardCvv.value, CardUtils.cardType(form.cardNumber.value));
    const isEmailValid = CardUtils.validateEmail(form.email.value);
    return {
        type: VALIDATE_FORM,
        payload: {
            isCardHolderValid,
            isCardNumberValid,
            isCardExpiryValid,
            isCardCvvValid,
            isEmailValid,
            valid: isCardHolderValid && isCardNumberValid && isCardExpiryValid && isCardCvvValid && isEmailValid
        }
    };
}

export {
    updateContainerSize,
    setDefaultEmail,
    setCardNumberVal,
    setCardExpireVal,
    setCardCvvVal,
    setCardHolderVal,
    setEmailVal,
    validateForm
};