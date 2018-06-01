import { AbstractAction } from './abstract-action';
import { AmountInfoState } from 'checkout/state';
import { TypeKeys } from 'checkout/actions/type-keys';

export interface InitializeAmountInfoCompleted extends AbstractAction<AmountInfoState> {
    type: TypeKeys.INITIALIZE_AMOUNT_INFO_COMPLETED;
    payload: AmountInfoState;
}
