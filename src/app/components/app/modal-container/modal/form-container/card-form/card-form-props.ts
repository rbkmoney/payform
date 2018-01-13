import { CardFormInfo, CardFormState, CardFormValues, ConfigState, ModelState } from 'checkout/state';
import { Locale } from 'checkout/locale';

export interface CardFormProps {
    config: ConfigState;
    model: ModelState;
    formInfo: CardFormInfo;
    cardForm: CardFormState;
    locale: Locale;
    pay: (c: ConfigState, m: ModelState, v: CardFormValues) => any;
    setViewInfoError: (hasError: boolean) => any;
    setViewInfoInProcess: (inProcess: boolean) => any;
}
