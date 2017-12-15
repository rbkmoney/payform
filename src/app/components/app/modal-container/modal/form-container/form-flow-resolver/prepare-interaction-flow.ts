import {
    BrowserPostRequest,
    Event,
    InteractionType,
    PaymentInteractionRequested,
    Redirect,
    RequestType
} from 'checkout/backend';
import { add, FormName } from 'checkout/form-flow';
import { check } from 'checkout/event-checker';
import { FormFlowItem, FormFlowStatus, ModalInteractionFlowItem } from 'checkout/form-flow';
import { FormContainerProps } from '../form-container-props';

const getRedirect = (redirect: Redirect): BrowserPostRequest => {
    if (redirect.request.requestType === RequestType.BrowserPostRequest) {
        return redirect.request as BrowserPostRequest;
    }
    throw new Error('Unsupported user interaction browser request type');
};

const getRequest = (events: Event[]): BrowserPostRequest => {
    const checkResult = check(events);
    const change = checkResult.change as PaymentInteractionRequested;
    const interaction = change.userInteraction;
    switch (interaction.interactionType) {
        case InteractionType.Redirect:
            return getRedirect(interaction as Redirect);
        case InteractionType.PaymentTerminalReceipt:
            throw new Error('Unsupported user interaction browser request type');
    }
};

export const prepareInteractionFlow = (f: FormFlowItem[], p: FormContainerProps): FormFlowItem[] => {
    return add(f, {
        formName: FormName.modalInteraction,
        active: true,
        status: FormFlowStatus.unprocessed,
        request: getRequest(p.model.invoiceEvents)
    } as ModalInteractionFlowItem);
};
