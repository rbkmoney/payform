import { AmountInfoState } from 'checkout/state';
import { AmountInfoUpdated, InitializeAmountInfoCompleted, TypeKeys } from 'checkout/actions';

type Action = InitializeAmountInfoCompleted | AmountInfoUpdated;

export function amountInfoReducer(s: AmountInfoState = null, action: Action): AmountInfoState {
    switch (action.type) {
        case TypeKeys.INITIALIZE_AMOUNT_INFO_COMPLETED:
            return action.payload;
        case TypeKeys.AMOUNT_INFO_UPDATED:
            return action.payload;
    }
    return s;
}
