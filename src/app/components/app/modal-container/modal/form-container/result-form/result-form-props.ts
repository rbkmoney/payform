import { Locale } from 'checkout/locale';
import { ModelState, ResultState, ResultFormInfo, FormInfo, EventsState } from 'checkout/state';
import { LogicError } from 'checkout/backend';
import { IntegrationType } from 'checkout/config';

export interface ResultFormProps {
    events: EventsState;
    integrationType: IntegrationType;
    locale: Locale;
    resultFormInfo: ResultFormInfo;
    error: LogicError;
    hasMultiMethods: boolean;
    hasErrorDescription: boolean;
    setResult: (resultState: ResultState) => any;
    goToFormInfo: (formInfo: FormInfo) => any;
}
