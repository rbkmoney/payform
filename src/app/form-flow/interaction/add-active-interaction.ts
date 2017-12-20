import { add, FormFlowItem, toInteractionForm } from 'checkout/form-flow';
import { Event } from 'checkout/backend';
import { FlowItemViewAnimation } from 'checkout/form-flow/flow-item/flow-item-view';

export const addActiveInteraction = (f: FormFlowItem[], e: Event[]): FormFlowItem[] => (add(f, {
    ...toInteractionForm(e),
    active: true,
    view: {
        animation: FlowItemViewAnimation.formsAnimation
    }
} as FormFlowItem));
