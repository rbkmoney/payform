import { CardFormValues, ConfigState, ModelState, State } from 'checkout/state';
import { FieldsConfig } from '../fields-config';
import { Locale } from 'checkout/locale';

export interface TerminalFormProps {
    locale: Locale;
    fieldsConfig: FieldsConfig;
    config: ConfigState;
    model: ModelState;
    pay: (c: ConfigState, m: ModelState, v: CardFormValues) => any;
    setViewInfoError: (hasError: boolean) => any;
    prepareToPay: () => any;
    setViewInfoHeight: (height: number) => any;
}