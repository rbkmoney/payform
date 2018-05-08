import { InteractionFormInfo, ModalForms, ModalInteraction, ModalState } from 'checkout/state';
import {
    CustomerBindingInteractionRequested,
    InteractionType,
    PaymentInteractionRequested,
    PaymentTerminalReceipt,
    Redirect
} from 'checkout/backend';

export const providePaymentInteraction = (change: PaymentInteractionRequested): ModalState => {
    const {userInteraction} = change;
    switch (userInteraction.interactionType) {
        case InteractionType.Redirect:
            return new ModalInteraction((userInteraction as Redirect).request, true);
        case InteractionType.PaymentTerminalReceipt:
            const formInfo = new InteractionFormInfo(userInteraction as PaymentTerminalReceipt);
            return new ModalForms([formInfo], true);
        default:
            throw {code: 'error.unsupported.user.interaction.type'};
    }
};

export const provideCustomerInteraction = (change: CustomerBindingInteractionRequested): ModalState => {
    const {userInteraction} = change;
    switch (userInteraction.interactionType) {
        case InteractionType.Redirect:
            return new ModalInteraction((userInteraction as Redirect).request, true);
        default:
            throw {code: 'error.unsupported.user.interaction.type'};
    }
};
