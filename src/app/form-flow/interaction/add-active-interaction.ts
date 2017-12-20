import { add, FormFlowItem, toInteractionForm } from 'checkout/form-flow';
import { Event } from 'checkout/backend';

export const addActiveInteraction = (f: FormFlowItem[], e: Event[]): FormFlowItem[] => (add(f, {
    ...toInteractionForm(e),
    active: true
} as FormFlowItem));
