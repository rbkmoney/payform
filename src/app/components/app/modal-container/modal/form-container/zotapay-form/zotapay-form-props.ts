import { ZotapayFormInfo, TerminalFormValues } from 'checkout/state';
import { FieldsConfig } from '../fields-config';
import { Locale } from 'checkout/locale';
import { FormattedAmount } from 'checkout/utils';
import { PaymentRequestedPayload } from 'checkout/actions';

export interface ZotapayFormProps {
    terminalFormInfo: ZotapayFormInfo;
    locale: Locale;
    fieldsConfig: FieldsConfig;
    pay: (payload: PaymentRequestedPayload) => any;
    setViewInfoError: (hasError: boolean) => any;
    amount: FormattedAmount;
    formValues: TerminalFormValues;
}
