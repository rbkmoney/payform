import toNumber from 'lodash-es/toNumber';
import { ModelState } from 'checkout/state';
import {
    Amount,
    resolveAmount,
} from 'checkout/utils';

const toMinor = (formAmount: string): number => toNumber(formAmount) * 100;

// TODO fix it
export const getAmountInfo = (model: ModelState, configAmount: number, formAmount: string): Amount => {
    const amountInfo = resolveAmount(model, configAmount);
    return {
        ...amountInfo,
        value: formAmount ? toMinor(formAmount) : amountInfo.value
    };
};
