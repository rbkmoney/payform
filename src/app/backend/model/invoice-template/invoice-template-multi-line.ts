import { InvoiceTemplateDetails } from './invoice-template-details';
import { InvoiceLine } from '../invoice-cart/invoice-line';

export class InvoiceTemplateMultiLine extends InvoiceTemplateDetails {

    public cart: InvoiceLine[];
    public currency: string;

    constructor(cart: InvoiceLine[], currency: string) {
        super();
        this.templateType = 'InvoiceTemplateMultiLine';
        this.cart = cart;
        this.currency = currency;
    }
}
