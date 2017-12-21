import { add, FormFlowItem, FormSizeClass, toInteractionForm } from 'checkout/form-flow';
import { Event } from 'checkout/backend';
import { DirectionTransition } from 'checkout/form-flow/flow-item/flow-item-view';

export const addActiveInteraction = (f: FormFlowItem[], e: Event[]): FormFlowItem[] => (add(f, {
    ...toInteractionForm(e),
    active: true,
    view: {
        slideDirection: DirectionTransition.right,
        formSizeClass: FormSizeClass._cardForm
    }
} as FormFlowItem));
