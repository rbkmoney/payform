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
import { select, SelectEffect } from 'redux-saga/effects';
import { isInteractionPopOutSelector } from '../../selectors';

export function* providePaymentInteraction(
    change: PaymentInteractionRequested
): IterableIterator<ModalForms | ModalInteraction | SelectEffect> {
    const { userInteraction } = change;
    switch (userInteraction.interactionType) {
        case InteractionType.Redirect:
            if (yield select(isInteractionPopOutSelector)) {
                return new ModalForms([new InteractionFormInfo(userInteraction)], true);
            }
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
}

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
