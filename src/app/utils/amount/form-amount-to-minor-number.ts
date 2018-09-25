import toNumber from 'lodash-es/toNumber';

export const formAmountToMinorNumber = (formAmount: string): number =>
    toNumber(formAmount.replace(/\s/g, '').replace(/,/g, '.')) * 100;
