import { CardFormInfo, CardFormState, CardFormValues, ConfigState, FormName, ModelState } from 'checkout/state';
import { Locale } from 'checkout/locale';

export interface CardFormProps {
    config: ConfigState;
    model: ModelState;
    cardFormInfo: CardFormInfo;
    cardForm: CardFormState;
    locale: Locale;
    formValues: CardFormValues;
    pay: (c: ConfigState, m: ModelState, v: CardFormValues) => any;
    setViewInfoError: (hasError: boolean, formName: FormName) => any;
    prepareToPay: () => any;
}
