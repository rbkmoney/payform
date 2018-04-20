import { resolveAmount } from './resolve-amount';
import { resolveInvoiceTemplate } from './resolve-invoice-template';
import { resolveInvoice } from './resolve-invoice';
import { findChange } from '../../event-utils';

jest.mock('./resolve-invoice-template');
jest.mock('../../event-utils');
jest.mock('./resolve-invoice');

it('null params should return null', () => {
    const actual = resolveAmount(null, null);
    expect(actual).toBeNull();
});

it('empty invoiceEvents and invoiceTemplate should return null', () => {
    const actual = resolveAmount({
        invoiceEvents: null,
        invoiceTemplate: null
    }, null);
    expect(actual).toBeNull();
});

describe('resolveInvoiceTemplate', () => {
    const resolveInvoiceTemplateMocked = resolveInvoiceTemplate as any;

    it('non empty invoiceTemplate should call resolveInvoiceTemplate', () => {
        resolveInvoiceTemplateMocked.mockReturnValueOnce(null);
        resolveAmount({
            invoiceTemplate: {},
            invoiceEvents: []
        } as any, 111);
        expect(resolveInvoiceTemplateMocked).toBeCalledWith({}, 111);
    });
});

describe('resolveInvoice', () => {
    const findChangeMocked = findChange as any;
    const resolveInvoiceMocked = resolveInvoice as any;
    const invoice = 'mock invoice';
    const findChangeResult = {invoice};

    beforeEach(() => {
        findChangeMocked.mockReturnValueOnce(findChangeResult);
        resolveInvoiceMocked.mockReturnValueOnce(null);
    });

    it('non empty invoiceEvents and empty invoiceTemplate should call resolveInvoice', () => {
        resolveAmount({
            invoiceEvents: []
        } as any, 111);
        expect(resolveInvoiceMocked).toBeCalledWith(invoice);
    });

    it('setting invoiceEventsFirst flag to true should call resolveInvoice', () => {
        resolveAmount({
            invoiceTemplate: {},
            invoiceEvents: []
        } as any, 111, true);
        expect(resolveInvoiceMocked).toBeCalledWith(invoice);
    });
});
