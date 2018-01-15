import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface ProcessAction extends AbstractAction<boolean> {
    type: TypeKeys.PROCESS_MODEL;
    payload: boolean;
}

export const process = (): ProcessAction => ({
    type: TypeKeys.PROCESS_MODEL,
    payload: true
});
