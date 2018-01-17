import {
    CardFormInfo, CardFormState, CardFormValues, ConfigState, FormInfo, FormName, ModalState,
    ModelState
} from 'checkout/state';
import { Locale } from 'checkout/locale';
import { SetActiveFormInfo } from 'checkout/actions/modal-actions/set-active-form-info';

export interface CardFormProps {
    config: ConfigState;
    model: ModelState;
    modals: ModalState[];
    formInfos: FormInfo[];
    cardFormInfo: CardFormInfo;
    cardForm: CardFormState;
    locale: Locale;
    formValues: CardFormValues;
    pay: (c: ConfigState, m: ModelState, v: CardFormValues) => any;
    setViewInfoError: (hasError: boolean, formName: FormName) => any;
    prepareToPay: () => any;
    setActiveFormInfo: (formName: FormName, modals: ModalState[]) => SetActiveFormInfo;
}
