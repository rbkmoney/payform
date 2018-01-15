import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface Accept extends AbstractAction {
    type: TypeKeys.ACCEPT_MODEL;
}

export const accept = (): Accept => ({
    type: TypeKeys.ACCEPT_MODEL
});
