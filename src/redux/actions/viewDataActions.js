import {
    UPDATE_CONTAINER_SIZE,
    SET_DEFAULT_EMAIL,
    SET_CARD_NUMBER_VALUE,
    SET_CARD_EXP_VALUE,
    SET_CARD_CVV_VALUE,
    SET_CARD_HOLDER_VALUE,
    SET_EMAIL_VALUE, VALIDATE_FORM,
    SET_FIELDS_VISIBILITY,
    SET_AMOUNT_VALUE,
    SET_AMOUNT_TYPE,
    SET_FIELDS_REQUIRED,
    SET_PAYMENT_METHOD
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
            value
        }
    };
}

function setCardExpireVal(value) {
    return {
        type: SET_CARD_EXP_VALUE,
        payload: {
            value
        }
    };
}

function setCardCvvVal(value) {
    return {
        type: SET_CARD_CVV_VALUE,
        payload: {
            value
        }
    };
}

function setCardHolderVal(value) {
    return {
        type: SET_CARD_HOLDER_VALUE,
        payload: {
            value
        }
    };
}

function setEmailVal(value) {
    return {
        type: SET_EMAIL_VALUE,
        payload: {
            value
        }
    };
}

function setAmountVal(value) {
    return {
        type: SET_AMOUNT_VALUE,
        payload: {
            value
        }
    };
}

function setAmountType(type) {
    return {
        type: SET_AMOUNT_TYPE,
        payload: {
            type
        }
    };
}

function validateForm(form) {
    const isCardHolderValid = CardUtils.validateCardHolder(form.cardHolder.value);
    const isCardNumberValid = CardUtils.validateCardNumber(form.cardNumber.value);
    const isCardExpiryValid = CardUtils.validateCardExpiry(form.cardExpire.value);
    const isCardCvvValid = CardUtils.validateCardCvv(form.cardCvv.value, CardUtils.cardType(form.cardNumber.value));
    const isEmailValid = CardUtils.validateEmail(form.email.value);

    let isAmountValid = null;
    if (form.amount.required) {
        if (form.amount.type.name === 'range') {
            isAmountValid = CardUtils.validateAmountRange(
                form.amount.value,
                form.amount.type.lowerBound,
                form.amount.type.upperBound
            );
        } else if (form.amount.type.name === 'unlim') {
            isAmountValid = CardUtils.validateAmount(form.amount.value);
        } else if (form.amount.type.name === 'fixed') {
            isAmountValid = true;
        }
    } else {
        isAmountValid = true;
    }
    const valid = isCardHolderValid
        && isCardNumberValid
        && isCardExpiryValid
        && isCardCvvValid
        && isEmailValid
        && isAmountValid;

    return {
        type: VALIDATE_FORM,
        payload: {
            isCardHolderValid,
            isCardNumberValid,
            isCardExpiryValid,
            isCardCvvValid,
            isEmailValid,
            isAmountValid,
            valid
        }
    };
}

function setFieldsVisibility(config) {
    return {
        type: SET_FIELDS_VISIBILITY,
        payload: {
            amountVisible: config.amountVisible
        }
    };
}

function setFieldsRequired(config) {
    return {
        type: SET_FIELDS_REQUIRED,
        payload: {
            amountRequired: config.amountRequired
        }
    };
}

function setPaymentMethod(method) {
    return {
        type: SET_PAYMENT_METHOD,
        payload: {
            paymentMethod: method
        }
    }
}

export {
    updateContainerSize,
    setDefaultEmail,
    setCardNumberVal,
    setCardExpireVal,
    setCardCvvVal,
    setCardHolderVal,
    setEmailVal,
    setAmountVal,
    setAmountType,
    validateForm,
    setFieldsVisibility,
    setFieldsRequired,
    setPaymentMethod
};