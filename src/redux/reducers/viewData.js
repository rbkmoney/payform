import {
    UPDATE_CONTAINER_SIZE,
    SET_DEFAULT_EMAIL,
    SET_CARD_NUMBER_VALUE,
    SET_CARD_EXP_VALUE,
    SET_CARD_CVV_VALUE,
    SET_CARD_HOLDER_VALUE,
    SET_EMAIL_VALUE,
    VALIDATE_FORM,
    SET_AMOUNT_VALUE,
    SET_AMOUNT_TYPE,
    SET_EMAIL_VISIBILITY,
    SET_AMOUNT_VISIBILITY,
    SET_CARD_SET_VISIBILITY,
    SET_AMOUNT_REQUIRED,
    SET_EMAIL_REQUIRED,
    SET_CARD_SET_REQUIRED
} from '../constants/viewData';

const defaultState = {
    containerSize: 'default',
    cardForm: {
        cardSet: {
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
            visible: true,
            required: true
        },
        email: {
            value: '',
            visible: true,
            required: true
        },
        amount: {
            value: '',
            visible: false,
            required: false,
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
        case SET_DEFAULT_EMAIL: {
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
        }
        case SET_CARD_NUMBER_VALUE:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    cardSet: {
                        ...state.cardForm.cardSet,
                        cardNumber: {
                            ...state.cardForm.cardSet.cardNumber,
                            value: action.payload.value
                        }
                    }
                }
            };
        case SET_CARD_EXP_VALUE:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    cardSet: {
                        ...state.cardForm.cardSet,
                        cardExpire: {
                            ...state.cardForm.cardSet.cardExpire,
                            value: action.payload.value
                        }
                    }
                }
            };
        case SET_CARD_CVV_VALUE:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    cardSet: {
                        ...state.cardForm.cardSet,
                        cardCvv: {
                            ...state.cardForm.cardSet.cardCvv,
                            value: action.payload.value
                        }
                    }
                }
            };
        case SET_CARD_HOLDER_VALUE:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    cardSet: {
                        ...state.cardForm.cardSet,
                        cardHolder: {
                            ...state.cardForm.cardSet.cardHolder,
                            value: action.payload.value
                        }
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
                    cardSet: {
                        ...state.cardForm.cardSet,
                        cardNumber: {
                            ...state.cardForm.cardSet.cardNumber,
                            valid: action.payload.cardSet.isCardNumberValid
                        },
                        cardExpire: {
                            ...state.cardForm.cardSet.cardExpire,
                            valid: action.payload.cardSet.isCardExpiryValid
                        },
                        cardCvv: {
                            ...state.cardForm.cardSet.cardCvv,
                            valid: action.payload.cardSet.isCardCvvValid
                        },
                        cardHolder: {
                            ...state.cardForm.cardSet.cardHolder,
                            valid: action.payload.cardSet.isCardHolderValid
                        },
                        valid: action.payload.cardSet.valid
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
        case SET_EMAIL_VISIBILITY:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    email: {
                        ...state.cardForm.email,
                        visible: action.payload
                    }
                }
            };
        case SET_AMOUNT_VISIBILITY:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    amount: {
                        ...state.cardForm.amount,
                        visible: action.payload
                    }
                }
            };
        case SET_CARD_SET_VISIBILITY:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    cardSet: {
                        ...state.cardForm.cardSet,
                        visible: action.payload
                    }
                }
            };
        case SET_EMAIL_REQUIRED:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    email: {
                        ...state.cardForm.email,
                        required: action.payload
                    }
                }
            };
        case SET_AMOUNT_REQUIRED:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    amount: {
                        ...state.cardForm.amount,
                        required: action.payload
                    }
                }
            };
        case SET_CARD_SET_REQUIRED:
            return {
                ...state,
                cardForm: {
                    ...state.cardForm,
                    cardSet: {
                        ...state.cardForm.cardSet,
                        required: action.payload
                    }
                }
            };
    }
    return state;
}
