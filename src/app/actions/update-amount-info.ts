import { TypeKeys, AbstractAction } from 'checkout/actions';
import { AmountInfoState } from 'checkout/state';

export interface AmountInfoUpdated extends AbstractAction<AmountInfoState> {
    type: TypeKeys.AMOUNT_INFO_UPDATED;
    payload: AmountInfoState;
}
