import { FormInfo, FormName } from './form-info';
import { PaymentTerminalReceipt } from 'checkout/backend';

export class InteractionFormInfo extends FormInfo {

    terminalReceipt: PaymentTerminalReceipt;

    constructor(terminalReceipt: PaymentTerminalReceipt) {
        super();
        this.name = FormName.interactionForm;
        this.terminalReceipt = terminalReceipt;
        this.active = true;
    }
}
