import { call, select } from 'redux-saga/effects';
import { getPayableInvoice } from './get-payable-invoice';
import { createInvoice } from './get-payable-invoice';
import { State } from 'checkout/state';
import { createInvoiceWithTemplate } from './create-invoice-with-template';

describe('getPayableInvoice', () => {
    const endpoint = 'http://test.endpoint' as any;
    const initConfig = 'initConfigMock' as any;
    const invoice = {amount: 'amountMock'} as any;
    const invoiceTemplate = 'invoiceTemplateMock' as any;
    const invoiceAccessToken = 'invoiceAccessTokenMock' as any;
    
    const m = {invoice, invoiceTemplate, invoiceAccessToken} as any;

    const a = {minorValue: 'amountMock'} as any;
    const f = 'formAmount' as any;
    
    it('should return { invoice, invoiceAccessToken }', () => {        
        const iterator = getPayableInvoice(initConfig, endpoint, m, a, f);
        const actual = iterator.next().value;
        expect(actual.toString()).toEqual({ invoice, invoiceAccessToken }.toString());
    });

    it('should call createInvoice', () => {  
        invoice.amount = "anotherAmount"      
        const iterator = getPayableInvoice(initConfig, endpoint, m, a, f);
        const actual = iterator.next().value;
        const expected = call(createInvoice, initConfig, endpoint, invoiceTemplate, a, f);
        expect(actual).toEqual(expected);
    });

    it('should get untyped error', () => {
        m.invoiceTemplate = undefined;
        const iterator = getPayableInvoice(initConfig, endpoint, m, a, f);
        const error = {code: 'error.inconsistent.model'};
        let actual;
        try {
            actual = iterator.next().value;
        } catch (e) {
            actual = e;
        }
        expect(actual).toEqual(error);
    });
});

describe('createInvoice', () => {
    const invoiceTemplateAccessToken = 'invoiceTemplateAccessTokenMock' as any;
    const endpoint = 'http://test.endpoint' as any;
    const initConfig = {invoiceTemplateAccessToken: 'invoiceTemplateAccessTokenMock'} as any;
    const invoiceTemplate = 'invoiceTemplateMock' as any;

    const a = {minorValue: 'amountMock'} as any;
    const f = 'formAmount' as any;
    
    const iterator = createInvoice(initConfig, endpoint, invoiceTemplate, a, f);
    it('should call createInvoiceWithTemplate', () => {        
        const actual = iterator.next().value;
        const expected = call(
            createInvoiceWithTemplate,
            endpoint,
            invoiceTemplateAccessToken,
            invoiceTemplate,
            a,
            f
        );
        expect(actual).toEqual(expected);
    });

    it('should select { invoice, invoiceAccessToken }', () => {  
        const actual = iterator.next().value;
        const expected = select((s: State) => ({
            invoice: s.model.invoice,
            invoiceAccessToken: s.model.invoiceAccessToken
        }));
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should return { invoice, invoiceAccessToken }', () => {
        const invoice = {amount: 'amountMock'} as any;
        const invoiceAccessToken = 'invoiceAccessTokenMock' as any;
        const params = { invoice, invoiceAccessToken } as any;
        const actual = iterator.next(params).value;
        expect(actual).toEqual({ invoice, invoiceAccessToken });
    });
});
