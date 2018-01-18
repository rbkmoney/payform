import {
    CardFormInfo, CardFormState, CardFormValues, ConfigState, FormInfo, FormName, ModalState,
    ModelState
} from 'checkout/state';
import { Locale } from 'checkout/locale';

export interface CardFormProps {
    config: ConfigState;
    model: ModelState;
    modals: ModalState[];
    cardFormInfo: CardFormInfo;
    cardForm: CardFormState;
    locale: Locale;
    formValues: CardFormValues;
    pay: (c: ConfigState, m: ModelState, v: CardFormValues) => any;
    setViewInfoError: (hasError: boolean, formName: FormName) => any;
    prepareToPay: () => any;
    setActiveFormInfo: (formName: FormName, modals: ModalState[]) => any;
}
