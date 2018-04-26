import {
    CustomerEvent,
    Event,
    InteractionType,
    PaymentInteractionRequested,
    PaymentTerminalReceipt,
    Redirect
} from 'checkout/backend';
import {
    ModalForms,
    ModalInteraction,
    ModalState,
    InteractionFormInfo
} from 'checkout/state';
import { getLastChange } from 'checkout/utils';

// TODO duplicate provide-modal.ts
export const toInteraction = (events: Event[] | CustomerEvent[]): ModalState => {
    const change = getLastChange(events) as PaymentInteractionRequested;
    const interaction = change.userInteraction;
    switch (interaction.interactionType) {
        case InteractionType.Redirect:
            return new ModalInteraction((interaction as Redirect).request, true);
        case InteractionType.PaymentTerminalReceipt:
            const formInfo = new InteractionFormInfo(interaction as PaymentTerminalReceipt);
            return new ModalForms([formInfo], true);
    }
};
