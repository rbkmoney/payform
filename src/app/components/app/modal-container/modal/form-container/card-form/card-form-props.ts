import { CardFormState, ConfigState, ModelState } from 'checkout/state';
import { SetFormsFlowAction } from 'checkout/actions';
import { Locale } from 'checkout/locale';
import { FormFlowItem } from 'checkout/form-flow';

export interface CardFormProps {
    formsFlow: FormFlowItem[];
    config: ConfigState;
    model: ModelState;
    setFormFlow: (formFlow: FormFlowItem[]) => SetFormsFlowAction;
    cardForm: CardFormState;
    locale: Locale;
}
