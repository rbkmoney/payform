import {
    EventInteractionObject,
    InteractionFormInfo,
    ModalForms,
    ModalInteraction,
    ModalInteractionType,
    ModalState
} from 'checkout/state';
import {
    CustomerBindingInteractionRequested,
    InteractionType,
    PaymentInteractionRequested,
    Redirect
} from 'checkout/backend';

export const providePaymentInteraction = (change: PaymentInteractionRequested): ModalState => {
    const { userInteraction } = change;
    switch (userInteraction.interactionType) {
        case InteractionType.Redirect:
            return new ModalInteraction(
                {
                    type: ModalInteractionType.EventInteraction,
                    request: (userInteraction as Redirect).request
                } as EventInteractionObject,
                true
            );
        case InteractionType.PaymentTerminalReceipt:
        case InteractionType.QrCodeDisplayRequest:
            const formInfo = new InteractionFormInfo(userInteraction);
            return new ModalForms([formInfo], true);
        default:
            throw { code: 'error.unsupported.user.interaction.type' };
    }
};

export const provideCustomerInteraction = (change: CustomerBindingInteractionRequested): ModalState => {
    const { userInteraction } = change;
    switch (userInteraction.interactionType) {
        case InteractionType.Redirect:
            return new ModalInteraction(
                {
                    type: ModalInteractionType.EventInteraction,
                    request: (userInteraction as Redirect).request
                } as EventInteractionObject,
                true
            );
        default:
            throw { code: 'error.unsupported.user.interaction.type' };
    }
};
