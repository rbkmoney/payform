import { FormInfo, FormName } from './form-info';
import { UserInteraction } from 'checkout/backend';

export class InteractionFormInfo extends FormInfo {
    name = FormName.interactionForm;
    active = true;

    constructor(public interaction: UserInteraction, previous?: FormName) {
        super(previous);
    }
}
