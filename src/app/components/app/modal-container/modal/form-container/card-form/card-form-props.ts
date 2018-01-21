import {
    CardFormInfo,
    CardFormValues,
    ConfigState,
    FormName,
    ModelState,
} from 'checkout/state';

export interface CardFormProps {
    config: ConfigState;
    model: ModelState;
    cardFormInfo: CardFormInfo;
    pay: (c: ConfigState, m: ModelState, v: CardFormValues) => any;
    setViewInfoError: (hasError: boolean, formName: FormName) => any;
    prepareToPay: (values: CardFormValues) => any;
}
