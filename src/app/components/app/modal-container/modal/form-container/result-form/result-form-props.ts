import { ResultAction } from 'checkout/actions';
import { Locale } from 'checkout/locale';
import { ModelState, ResultState, ResultFormInfo } from 'checkout/state';
import { LogicError } from 'checkout/backend';

export interface ResultFormProps {
    model: ModelState;
    locale: Locale;
    formInfo: ResultFormInfo;
    error: LogicError;
    setResult: (resultState: ResultState) => ResultAction;
}
