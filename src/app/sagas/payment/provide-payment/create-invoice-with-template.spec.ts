import { call, put } from 'redux-saga/effects';
import { createInvoiceWithTemplate, getAmount } from './create-invoice-with-template';
import { createInvoiceWithTemplate as request } from 'checkout/backend';
import { TypeKeys, InvoiceCreated } from 'checkout/actions';

describe('createInvoiceWithTemplate', () => {
    const endpoint = 'http://test.endpoint';
    const invoiceTemplate = {id: 'idMock', metadata: 'InvoiceTemplateMock'} as any;
    const a = {amountInfo: 'AmountInfoStateMock'} as any;
    const formAmount = 'formAmountMock';
    const params = {
        amount: getAmount(a, formAmount),
        metadata: invoiceTemplate.metadata,
        currency: a.currencyCode
    } as any;

    const token = 'invoiceAccessTokenMock';

    const iterator = createInvoiceWithTemplate(endpoint, token, invoiceTemplate, a, formAmount);
    
    it('should call createInvoiceWithTemplate', () => {        
        const actual = iterator.next().value;
        const expected = call(request, endpoint, token, invoiceTemplate.id, params);
        expect(actual).toEqual(expected);
    });

    it('should put invoice created', () => {
        const invoice = 'invoiceMock' as any;    
        const invoiceAccessToken = {payload: 'invoiceAccessTokenMock'};    
        const actual = iterator.next({ invoice, invoiceAccessToken } as any).value;
        const expected = put({
            type: TypeKeys.INVOICE_CREATED,
            payload: {
                invoice,
                invoiceAccessToken: invoiceAccessToken.payload
            }
        } as InvoiceCreated);
        expect(actual).toEqual(expected);
    });
});
