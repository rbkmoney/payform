import { InvoiceTemplateLineCostFixed } from 'checkout/backend';
import { getAmountFromSingleLine } from './get-amount-from-single-line';
import { AmountInfoStatus } from 'checkout/state';

it('InvoiceTemplateLineCostFixed should return amount', () => {
    const singleLine = {
        price: {
            costType: 'InvoiceTemplateLineCostFixed',
            amount: 149900,
            currency: 'RUB'
        }
    } as any;
    const actual = getAmountFromSingleLine(singleLine, 111);
    const expected = {
        status: AmountInfoStatus.final,
        currencyCode: 'RUB',
        minorValue: 149900
    };
    expect(actual).toEqual(expected);
});

describe('InvoiceTemplateLineCostRange', () => {
    const singleLine = {
        price: {
            costType: 'InvoiceTemplateLineCostRange',
            range: {
                lowerBound: 1000,
                upperBound: 2000
            },
            currency: 'RUB'
        }
    } as any;

    it('with amountConfig should return final status', () => {
        const actual = getAmountFromSingleLine(singleLine, 111);
        const expected = {
            status: AmountInfoStatus.final,
            currencyCode: 'RUB',
            minorValue: 111
        };
        expect(actual).toEqual(expected);
    });

    it('without amountConfig should return notKnown status', () => {
        const actual = getAmountFromSingleLine(singleLine, null);
        const expected = {
            status: AmountInfoStatus.notKnown,
            currencyCode: 'RUB'
        };
        expect(actual).toEqual(expected);
    });
});

describe('InvoiceTemplateLineCostUnlim', () => {
    const singleLine = {
        price: {
            costType: 'InvoiceTemplateLineCostUnlim'
        }
    } as any;

    it('with amountConfig should return final status', () => {
        const actual = getAmountFromSingleLine(singleLine, 111);
        const expected = {
            status: AmountInfoStatus.final,
            currencyCode: 'RUB',
            minorValue: 111
        };
        expect(actual).toEqual(expected);
    });

    it('without amountConfig should return notKnown status', () => {
        const actual = getAmountFromSingleLine(singleLine, null);
        const expected = {
            status: AmountInfoStatus.notKnown,
            currencyCode: 'RUB'
        };
        expect(actual).toEqual(expected);
    });
});
