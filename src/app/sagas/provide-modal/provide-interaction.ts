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

function shouldOpenInSeparateWindow(url: string) {
    return url.search('freelanceme.kz') !== -1;
}

export const providePaymentInteraction = (change: PaymentInteractionRequested): ModalState => {
    const { userInteraction } = change;
    switch (userInteraction.interactionType) {
        case InteractionType.Redirect:
            const request = (userInteraction as Redirect).request;
            if (shouldOpenInSeparateWindow(request.uriTemplate)) {
                return new ModalForms([new InteractionFormInfo(userInteraction)], true);
            }
            return new ModalInteraction(
                {
                    type: ModalInteractionType.EventInteraction,
                    request
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
