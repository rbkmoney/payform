import { v4 as uuidv4 } from 'uuid';

import { toDisplayAmount } from 'checkout/utils';
import { AmountInfoState } from 'checkout/state';

export const getYaPaymentOrder = (amountInfo: AmountInfoState, formAmount: string) => ({
    id: uuidv4(),
    total: {
        amount: toDisplayAmount(amountInfo, formAmount)
    }
});
