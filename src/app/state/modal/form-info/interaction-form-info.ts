import { FormInfo, FormName } from './form-info';
import { PaymentStatus } from './payment-status';
import { UserInteraction } from 'checkout/backend/model/event/user-interaction';

export enum InteractionFormType {
    terminalInteraction = 'terminalInteraction'
}

export class InteractionFormInfo extends FormInfo {

    paymentStatus: PaymentStatus;
    type: InteractionFormType;
    interaction: UserInteraction;

    constructor(paymentStatus: PaymentStatus, type: InteractionFormType, interaction: UserInteraction, previous?: FormName) {
        super(previous);
        this.name = FormName.interactionForm;
        this.type = type;
        this.interaction = interaction;
        this.active = true;
        this.paymentStatus = paymentStatus;
    }
}
