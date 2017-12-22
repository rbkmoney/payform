import { add, FormFlowItem, FormSizeClass, toInteractionForm, DirectionTransition } from 'checkout/form-flow';
import { Event } from 'checkout/backend';

export const addActiveInteraction = (f: FormFlowItem[], e: Event[]): FormFlowItem[] => (add(f, {
    ...toInteractionForm(e),
    active: true,
    view: {
        slideDirection: DirectionTransition.right,
        formSizeClass: FormSizeClass.cardForm
    }
} as FormFlowItem));
