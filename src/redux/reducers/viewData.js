import {
    UPDATE_CONTAINER_SIZE,
    SET_DEFAULT_EMAIL,
    SET_CARD_NUMBER_VALUE,
    SET_CARD_EXP_VALUE,
    SET_CARD_CVV_VALUE,
    SET_CARD_HOLDER_VALUE,
    SET_EMAIL_VALUE,
    VALIDATE_FORM
} from '../constants/viewData';

const defaultState = {
    containerSize: 'default',
    cardForm: {
        cardHolder: {value: ''},
        cardNumber: {value: ''},
        cardExpire: {value: ''},
        cardCvv: {value: ''},
        email: {value: ''},
        amount: {
            value: '',
            isRequired: false
        }
    }
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case UPDATE_CONTAINER_SIZE:
            return {
                ...state,
                containerSize: action.payload.containerSize
            };
        case SET_DEFAULT_EMAIL:
            return {
                ...state,
                defaultEmail: action.payload.defaultEmail
            };
        case SET_CARD_NUMBER_VALUE:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    cardNumber: {
                        ...state.cardForm.cardNumber,
                        value: action.payload.value
                    }
                }
            };
        case SET_CARD_EXP_VALUE:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    cardExpire: {
                        ...state.cardForm.cardExpire,
                        value: action.payload.value
                    }
                }
            };
        case SET_CARD_CVV_VALUE:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    cardCvv: {
                        ...state.cardForm.cardCvv,
                        value: action.payload.value
                    }
                }
            };
        case SET_CARD_HOLDER_VALUE:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    cardHolder: {
                        ...state.cardForm.cardHolder,
                        value: action.payload.value
                    }
                }
            };
        case SET_EMAIL_VALUE:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    email: {
                        ...state.cardForm.email,
                        value: action.payload.value
                    }
                }
            };
        case VALIDATE_FORM:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    cardNumber: {
                        ...state.cardForm.cardNumber,
                        valid: action.payload.isCardNumberValid
                    },
                    cardExpire: {
                        ...state.cardForm.cardExpire,
                        valid: action.payload.isCardExpiryValid
                    },
                    cardCvv: {
                        ...state.cardForm.cardCvv,
                        valid: action.payload.isCardCvvValid
                    },
                    cardHolder: {
                        ...state.cardForm.cardHolder,
                        valid: action.payload.isCardHolderValid
                    },
                    email: {
                        ...state.cardForm.email,
                        valid: action.payload.isEmailValid
                    },
                    valid: action.payload.valid
                }
            };
    }
    return state;
}
