import {
    BrowserPostRequest,
    ChangeType,
    Event,
    InteractionType,
    PaymentInteractionRequested,
    Redirect,
    RequestType
} from 'checkout/backend';
import { getLastChange, getLastEventID, ModalInteractionFlowItem } from 'checkout/form-flow';

const getRedirect = (redirect: Redirect): BrowserPostRequest => {
    if (redirect.request.requestType === RequestType.BrowserPostRequest) {
        return redirect.request as BrowserPostRequest;
    }
    throw new Error('Unsupported user interaction browser request type');
};

const getRequest = (events: Event[]): BrowserPostRequest => {
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

export const toInteractionForm = (e: Event[]): ModalInteractionFlowItem =>
    new ModalInteractionFlowItem(getRequest(e), getLastEventID(e));
