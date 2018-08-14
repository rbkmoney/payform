import { toNumber } from 'lodash-es';

export const formAmountToMinorNumver = (formAmount: string): number =>
    toNumber(formAmount.replace(/\s/g, '').replace(/,/g, '.')) * 100;
