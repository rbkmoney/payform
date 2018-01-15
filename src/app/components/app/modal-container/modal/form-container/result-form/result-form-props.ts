import { Locale } from 'checkout/locale';
import { ModelState, ResultState, ResultFormInfo, ConfigState } from 'checkout/state';
import { LogicError } from 'checkout/backend';

export interface ResultFormProps {
    model: ModelState;
    config: ConfigState;
    locale: Locale;
    resultFormInfo: ResultFormInfo;
    error: LogicError;
    isPaymentStarted: boolean;
    setResult: (resultState: ResultState) => any;
    prepareToRetry: (resetFormData: boolean) => any;
}
