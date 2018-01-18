import {
    CardFormInfo, CardFormState, CardFormValues, ConfigState, FormInfo, FormName, ModalState,
    ModelState
} from 'checkout/state';
import { Locale } from 'checkout/locale';

export interface CardFormProps {
    config: ConfigState;
    model: ModelState;
    cardFormInfo: CardFormInfo;
    hasBack: boolean;
    cardForm: CardFormState;
    locale: Locale;
    formValues: CardFormValues;
    pay: (c: ConfigState, m: ModelState, v: CardFormValues) => any;
    setViewInfoError: (hasError: boolean, formName: FormName) => any;
    prepareToPay: () => any;
    setActiveFormInfo: (formName: FormName) => any;
}
