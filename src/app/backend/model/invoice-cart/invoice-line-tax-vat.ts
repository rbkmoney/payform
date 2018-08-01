import { InvoiceLineTaxMode } from './invoice-line-tax-mode';

export class InvoiceLineTaxVAT extends InvoiceLineTaxMode {
    rate: string;

    constructor(rate: string) {
        super();
        this.type = 'InvoiceLineTaxVAT';
        this.rate = rate;
    }
}
