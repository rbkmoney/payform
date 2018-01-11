import {
    BrowserPostRequest,
    ChangeType,
    Event,
    InteractionType,
    PaymentInteractionRequested,
    Redirect,
    RequestType
} from 'checkout/backend';
import { getLastChange } from 'checkout/form-flow';

const getRedirect = (redirect: Redirect): BrowserPostRequest => {
    if (redirect.request.requestType === RequestType.BrowserPostRequest) {
        return redirect.request as BrowserPostRequest;
    }
    throw new Error('Unsupported user interaction browser request type');
};

export const toRequest = (events: Event[]): BrowserPostRequest => {
    const change = getLastChange(events);
    if (!change || change.changeType !== ChangeType.PaymentInteractionRequested) {
        throw new Error('ChangeType must be PaymentInteractionRequested');
    }
    const interaction = (change as PaymentInteractionRequested).userInteraction;
    switch (interaction.interactionType) {
        case InteractionType.Redirect:
            return getRedirect(interaction as Redirect);
        case InteractionType.PaymentTerminalReceipt:
            throw new Error('Unsupported user interaction PaymentTerminalReceipt');
    }
};
