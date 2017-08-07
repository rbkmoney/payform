import {
    UPDATE_CONTAINER_SIZE,
    SET_DEFAULT_EMAIL,
    SET_CARD_NUMBER_VALUE,
    SET_CARD_EXP_VALUE,
    SET_CARD_CVV_VALUE,
    SET_CARD_HOLDER_VALUE,
    SET_EMAIL_VALUE,
    VALIDATE_FORM,
    SET_FIELDS_VISIBILITY,
    SET_AMOUNT_VALUE,
    SET_AMOUNT_TYPE
} from '../constants/viewData';

const defaultState = {
    containerSize: 'default',
    cardForm: {
        cardHolder: {
            value: ''
        },
        cardNumber: {
            value: ''
        },
        cardExpire: {
            value: ''
        },
        cardCvv: {
            value: ''
        },
        email: {
            value: '',
            visible: true
        },
        amount: {
            value: '',
            visible: false,
            type: ''
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
            const email = action.payload.defaultEmail;
            return email ? {
                ...state,
                defaultEmail: email,
                cardForm: {
                    ...state.cardForm,
                    email: {
                        ...state.cardForm.email,
                        value: email,
                        visible: false
                    }
                }
            } : state;
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
        case SET_AMOUNT_VALUE:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    amount: {
                        ...state.cardForm.amount,
                        value: action.payload.value
                    }
                }
            };
        case SET_AMOUNT_TYPE:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    amount: {
                        ...state.cardForm.amount,
                        type: action.payload.type
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
                    amount: {
                        ...state.cardForm.amount,
                        valid: action.payload.isAmountValid
                    },
                    valid: action.payload.valid
                }
            };
        case SET_FIELDS_VISIBILITY:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    // cardNumber: {
                    //     ...state.cardForm.cardNumber,
                    //     visible: action.payload.isCardNumberValid
                    // },
                    // cardExpire: {
                    //     ...state.cardForm.cardExpire,
                    //     visible: action.payload.isCardExpiryValid
                    // },
                    // cardCvv: {
                    //     ...state.cardForm.cardCvv,
                    //     visible: action.payload.isCardCvvValid
                    // },
                    // cardHolder: {
                    //     ...state.cardForm.cardHolder,
                    //     visible: action.payload.isCardHolderValid
                    // },
                    // email: {
                    //     ...state.cardForm.email,
                    //     visible: action.payload.isEmailValid
                    // },
                    amount: {
                        visible: action.payload.amountVisible
                    }
                }
            };
    }
    return state;
}
