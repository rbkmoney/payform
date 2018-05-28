import { resolveInvoice } from './resolve-invoice';
import { getAmountInfo } from './get-amount-info';
import { IntegrationType } from 'checkout/config';
import { resolveInvoiceTemplate } from './resolve-invoice-template';

jest.mock('./resolve-invoice');
jest.mock('./resolve-invoice-template');

const resolveInvoiceMock = resolveInvoice as any;
const resolveInvoiceTemplateMock = resolveInvoiceTemplate as any;

it('invoice integration type should call resolveInvoice', () => {
    const initConfig = {
        integrationType: IntegrationType.invoice
    } as any;
    const model = {
        invoice: 'invoiceMock'
    } as any;
    getAmountInfo(initConfig, model);
    expect(resolveInvoiceMock.mock.calls.length).toBe(1);
    expect(resolveInvoiceMock.mock.calls[0]).toEqual([model.invoice]);
});

it('invoice template integration type should call resolveInvoiceTemplate', () => {
    const initConfig = {
        integrationType: IntegrationType.invoiceTemplate,
        amount: 999
    } as any;
    const model = {
        invoiceTemplate: 'invoiceTemplateMock'
    } as any;
    getAmountInfo(initConfig, model);
    expect(resolveInvoiceTemplateMock.mock.calls.length).toBe(1);
    expect(resolveInvoiceTemplateMock.mock.calls[0]).toEqual([model.invoiceTemplate, initConfig.amount]);
});

it('customer integration type should return null', () => {
    const initConfig = {
        integrationType: IntegrationType.customer
    } as any;
    const actual = getAmountInfo(initConfig, null);
    expect(actual).toBeNull();
});
