import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface PrepareToPay extends AbstractAction {
    type: TypeKeys.PREPARE_TO_PAY;
}

export const prepareToPay = (): PrepareToPay => ({
    type: TypeKeys.PREPARE_TO_PAY
});

export interface PrepareToRetry extends AbstractAction<boolean> {
    type: TypeKeys.PREPARE_TO_RETRY;
    payload: boolean;
}

export const prepareToRetry = (resetFormData: boolean): PrepareToRetry => ({
    type: TypeKeys.PREPARE_TO_RETRY,
    payload: resetFormData
});
