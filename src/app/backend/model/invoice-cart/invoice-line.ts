import { InvoiceLineTaxMode } from './invoice-line-tax-mode';

export class InvoiceLine {

    product: string;
    quantity: number;
    price: number;
    taxMode?: InvoiceLineTaxMode;

    constructor(product: string, quantity: number, price: number) {
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }
}
