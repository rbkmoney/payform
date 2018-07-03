import { Locale } from 'checkout/locale';
import { ModelState, ResultState, ResultFormInfo } from 'checkout/state';
import { LogicError } from 'checkout/backend';
import { IntegrationType } from 'checkout/config';

export interface ResultFormProps {
    model: ModelState;
    integrationType: IntegrationType;
    locale: Locale;
    resultFormInfo: ResultFormInfo;
    error: LogicError;
    hasMultiMethods: boolean;
    setResult: (resultState: ResultState) => any;
    setViewInfoHeight: (height: number) => any;
}
