import { CostType, InvoiceTemplateLineCostRange } from 'checkout/backend';
import { toNumber } from 'lodash';
import { validateAmount } from '../validation';
import { AmountProps } from './amount';

export const validate = (value: string, props: AmountProps): boolean => {
    const binded = validateAmount.bind(null, toNumber(value) * 100);
    switch (props.cost.costType) {
        case CostType.InvoiceTemplateLineCostRange:
            const range = (props.cost as InvoiceTemplateLineCostRange).range;
            return binded(range.lowerBound, range.upperBound);
        case CostType.InvoiceTemplateLineCostUnlim:
            return binded();
    }
};
