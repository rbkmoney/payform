import toNumber from 'lodash-es/toNumber';
import { AmountInfoState, AmountInfoStatus } from 'checkout/state';

const format = (formAmount: string): string =>
    formAmount.replace(/\s/g, '').replace(/,/g, '.');

export const toMinorAmount = (formAmount: string): number =>
    toNumber(format(formAmount)) * 100;

export const toDisplayAmount = (amountInfo: AmountInfoState, formAmount: string): string => {
    switch (amountInfo.status) {
        case AmountInfoStatus.final:
            return amountInfo.minorValue / 100 + '';
        case AmountInfoStatus.notKnown:
            return format(formAmount);
    }
};
