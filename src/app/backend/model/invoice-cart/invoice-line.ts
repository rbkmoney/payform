import { InvoiceLineTaxMode } from './invoice-line-tax-mode';

export class InvoiceLine {

    public product: string;
    public quantity: number;
    public price: number;
    public taxMode?: InvoiceLineTaxMode;

    constructor(product: string, quantity: number, price: number) {
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }
}
