import toNumber from 'lodash-es/toNumber';
import { ModelState } from 'checkout/state';
import {
    Amount,
    resolveInvoice,
    resolveInvoiceTemplate,
} from 'checkout/utils';

const toMinor = (formAmount: string): number => toNumber(formAmount) * 100;

export const getAmountInfo = (model: ModelState, configAmount: number, formAmount: string): Amount => {
    let info;
    const {invoiceTemplate, invoice} = model;
    if (invoiceTemplate) {
        info = resolveInvoiceTemplate(invoiceTemplate, configAmount);
    } else if (invoice) {
        info = resolveInvoice(invoice);
    } else {
        throw {code: 'error.inconsistent.model'};
    }
    return {
        ...info,
        value: formAmount ? toMinor(formAmount) : info.value
    };
};
