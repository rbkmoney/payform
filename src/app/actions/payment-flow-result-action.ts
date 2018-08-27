import { TypeKeys } from './type-keys';
import { PaymentFlowResultState } from '../state';
import { AbstractAction } from './abstract-action';

export interface PaymentFlowResultAction extends AbstractAction<PaymentFlowResultState> {
    type: TypeKeys.SET_PAYMENT_FLOW_RESULT;
    payload: PaymentFlowResultState;
}
