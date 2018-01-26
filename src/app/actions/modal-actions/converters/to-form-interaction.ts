import { ChangeType, Event, InteractionType, PaymentInteractionRequested, Redirect } from 'checkout/backend';
import { InteractionFormInfo, InteractionFormType } from 'checkout/state/modal/form-info/interaction-form-info';
import { getLastChange } from 'checkout/utils';
import { getRedirect } from 'checkout/actions/modal-actions/converters/index';
import { ModalForms, ModalInteraction, ModalState, PaymentStatus } from 'checkout/state';

export const toInteraction = (events: Event[]): ModalState => {
    const change = getLastChange(events);
    if (!change || change.changeType !== ChangeType.PaymentInteractionRequested) {
        throw new Error('ChangeType must be PaymentInteractionRequested');
    }
    const interaction = (change as PaymentInteractionRequested).userInteraction;
    switch (interaction.interactionType) {
        case InteractionType.Redirect:
            return new ModalInteraction(getRedirect(interaction as Redirect), true);
        case InteractionType.PaymentTerminalReceipt:
            const formInfo = new InteractionFormInfo(PaymentStatus.started, InteractionFormType.terminalInteraction, interaction);
            return new ModalForms([formInfo], true);
    }
};
