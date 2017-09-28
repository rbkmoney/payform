import {
    UPDATE_CONTAINER_SIZE,
    SET_DEFAULT_EMAIL,
    SET_CARD_NUMBER_VALUE,
    SET_CARD_EXP_VALUE,
    SET_CARD_CVV_VALUE,
    SET_CARD_HOLDER_VALUE,
    SET_EMAIL_VALUE, VALIDATE_FORM,
    SET_AMOUNT_VALUE,
    SET_AMOUNT_TYPE,
    SET_EMAIL_VISIBILITY,
    SET_AMOUNT_VISIBILITY,
    SET_CARD_SET_VISIBILITY,
    SET_AMOUNT_REQUIRED,
    SET_EMAIL_REQUIRED,
    SET_CARD_SET_REQUIRED,
    SET_ACTIVE_FORM, SET_PREVIOUS_FORM,
    RESET_VALIDATION
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

function setActiveForm(form) {
    return {
        type: SET_ACTIVE_FORM,
        payload: form
    }
}

function setPreviousForm(formName) {
    return {
        type: SET_PREVIOUS_FORM,
        payload: formName
    }
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
    const cardSet = form.cardSet;
    let isCardHolderValid;
    let isCardNumberValid;
    let isCardExpiryValid;
    let isCardCvvValid;
    let isCardSetValid;
    if (cardSet.required) {
        isCardHolderValid = CardUtils.validateCardHolder(cardSet.cardHolder.value);
        isCardNumberValid = CardUtils.validateCardNumber(cardSet.cardNumber.value);
        isCardExpiryValid = CardUtils.validateCardExpiry(cardSet.cardExpire.value);
        isCardCvvValid = CardUtils.validateCardCvv(cardSet.cardCvv.value, CardUtils.cardType(cardSet.cardNumber.value));
        isCardSetValid = isCardHolderValid && isCardNumberValid && isCardExpiryValid && isCardCvvValid;
    } else {
        isCardHolderValid = true;
        isCardNumberValid = true;
        isCardExpiryValid = true;
        isCardCvvValid = true;
        isCardSetValid = true;
    }

    const isEmailValid = form.email.required ? CardUtils.validateEmail(form.email.value) : true;

    let isAmountValid;
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
    const valid = isCardSetValid
        && isEmailValid
        && isAmountValid;
    return {
        type: VALIDATE_FORM,
        payload: {
            cardSet: {
                isCardHolderValid,
                isCardNumberValid,
                isCardExpiryValid,
                isCardCvvValid,
                valid: isCardSetValid
            },
            isEmailValid,
            isAmountValid,
            valid
        }
    };
}

function resetValidation() {
    return {
        type: RESET_VALIDATION
    }
}

function setEmailVisibility(visible) {
    return {
        type: SET_EMAIL_VISIBILITY,
        payload: visible
    };
}

function setAmountVisibility(visible) {
    return {
        type: SET_AMOUNT_VISIBILITY,
        payload: visible
    };
}

function setCardSetVisibility(visible) {
    return {
        type: SET_CARD_SET_VISIBILITY,
        payload: visible
    };
}

function setAmountRequired(required) {
    return {
        type: SET_AMOUNT_REQUIRED,
        payload: required
    };
}

function setEmailRequired(required) {
    return {
        type: SET_EMAIL_REQUIRED,
        payload: required
    };
}

function setCardSetRequired(required) {
    return {
        type: SET_CARD_SET_REQUIRED,
        payload: required
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
    setAmountVal,
    setAmountType,
    setEmailVisibility,
    setAmountVisibility,
    setCardSetVisibility,
    setAmountRequired,
    setEmailRequired,
    setCardSetRequired,
    setActiveForm,
    setPreviousForm,
    validateForm,
    resetValidation
};
