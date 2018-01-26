import {
    BrowserRequest,
    ChangeType,
    Event,
    InteractionType,
    PaymentInteractionRequested,
    Redirect,
} from 'checkout/backend';
import { ModalInteraction } from 'checkout/state';
import { getLastChange } from 'checkout/utils';

const toRequest = (events: Event[]): BrowserRequest => {
    const change = getLastChange(events);
    if (!change || change.changeType !== ChangeType.PaymentInteractionRequested) {
        throw new Error('ChangeType must be PaymentInteractionRequested');
    }
    const interaction = (change as PaymentInteractionRequested).userInteraction;
    switch (interaction.interactionType) {
        case InteractionType.Redirect:
            return (interaction as Redirect).request;
        case InteractionType.PaymentTerminalReceipt:
            throw new Error('Unsupported user interaction PaymentTerminalReceipt');
    }
    throw new Error('Unsupported InteractionType');
};

export const toModalInteraction = (events: Event[]) => new ModalInteraction(toRequest(events), true);
