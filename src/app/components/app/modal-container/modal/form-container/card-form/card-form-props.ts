import {
    CardFormInfo,
    CardFormValues
} from 'checkout/state';
import {Locale} from 'checkout/locale';
import { FieldsConfig } from '../fields-config';
import { PaymentRequestedPayload } from 'checkout/actions';
import { IntegrationType } from 'checkout/config';

export interface CardFormProps {
    integrationType: IntegrationType;
    locale: Locale;
    cardFormInfo: CardFormInfo;
    formValues: CardFormValues;
    fieldsConfig: FieldsConfig;
    pay: (payload: PaymentRequestedPayload) => any;
    subscribe: (v: CardFormValues) => any;
    setViewInfoError: (hasError: boolean) => any;
    prepareToPay: () => any;
    setViewInfoHeight: (height: number) => any;
}
