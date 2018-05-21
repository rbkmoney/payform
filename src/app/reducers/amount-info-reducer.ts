import { AmountInfoState } from 'checkout/state';
import { InitializeAmountInfoCompleted, TypeKeys } from 'checkout/actions';

export function amountInfoReducer(s: AmountInfoState = null, action: InitializeAmountInfoCompleted): AmountInfoState {
    switch (action.type) {
        case TypeKeys.INITIALIZE_AMOUNT_INFO_COMPLETED:
            return action.payload;
    }
    return s;
}
