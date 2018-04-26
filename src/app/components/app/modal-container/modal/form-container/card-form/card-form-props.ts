import {
    CardFormInfo,
    CardFormValues,
    ConfigState,
    ModelState,
} from 'checkout/state';
import {Locale} from 'checkout/locale';
import { FieldsConfig } from '../fields-config';
import { PaymentRequestedPayload } from 'checkout/actions';

export interface CardFormProps {
    locale: Locale;
    config: ConfigState;
    model: ModelState;
    cardFormInfo: CardFormInfo;
    formValues: CardFormValues;
    fieldsConfig: FieldsConfig;
    pay: (payload: PaymentRequestedPayload) => any;
    subscribe: (c: ConfigState, m: ModelState, v: CardFormValues) => any;
    setViewInfoError: (hasError: boolean) => any;
    prepareToPay: () => any;
    setViewInfoHeight: (height: number) => any;
}
