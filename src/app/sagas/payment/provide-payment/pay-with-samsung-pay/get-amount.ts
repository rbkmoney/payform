import { AmountInfoState, AmountInfoStatus, TokenProviderFormValues } from 'checkout/state';
import toNumber from 'lodash-es/toNumber';

export const getAmount = (amountInfo: AmountInfoState, v: TokenProviderFormValues): number => {
    switch (amountInfo.status) {
        case AmountInfoStatus.final:
            return amountInfo.minorValue / 100;
        case AmountInfoStatus.notKnown:
            return toNumber(v.amount);
    }
};
