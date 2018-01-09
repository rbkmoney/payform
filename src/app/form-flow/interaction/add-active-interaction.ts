import { add, FormFlowItem, FormHeight, toInteractionForm, DirectionTransition } from 'checkout/form-flow';
import { Event } from 'checkout/backend';

export const addActiveInteraction = (f: FormFlowItem[], e: Event[]): FormFlowItem[] => (add(f, {
    ...toInteractionForm(e),
    active: true,
    view: {
        slideDirection: DirectionTransition.right,
        height: FormHeight.cardForm
    }
} as FormFlowItem));
