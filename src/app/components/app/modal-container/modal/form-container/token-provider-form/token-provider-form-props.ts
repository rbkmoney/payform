import { Locale } from 'checkout/locale';
import {
    ConfigState,
    ModelState,
    TokenProviderFormInfo,
    TokenProviderFormValues
} from 'checkout/state';
import { FieldsConfig } from '../fields-config';

export interface TokenProviderFormProps {
    tokenProviderFormInfo: TokenProviderFormInfo;
    locale: Locale;
    fieldsConfig: FieldsConfig;
    formValues: TokenProviderFormValues;
    config: ConfigState;
    model: ModelState;
    setViewInfoError: (hasError: boolean) => any;
    setViewInfoHeight: (height: number) => any;
    prepareToPay: () => any;
    pay: (c: ConfigState, m: ModelState, v: TokenProviderFormValues) => any;
}
