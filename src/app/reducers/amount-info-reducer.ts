import { AmountInfoState } from 'checkout/state';
import { InitializeAmountInfoCompleted, TypeKeys } from 'checkout/actions';

type Action = InitializeAmountInfoCompleted;

export function amountInfoReducer(s: AmountInfoState = null, action: Action): AmountInfoState {
    switch (action.type) {
        case TypeKeys.INITIALIZE_AMOUNT_INFO_COMPLETED:
            return action.payload;
    }
    return s;
}
