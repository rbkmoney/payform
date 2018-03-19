import { resolveIntegrationType } from './resolve-integration-type';
import { IntegrationType } from 'checkout/config';

it('empty config should return null', () => {
    const result = resolveIntegrationType(null);
    expect(result).toEqual(null);
});

it('wrong config should return null', () => {
    const result = resolveIntegrationType({
        wrongField: 'some value'
    });
    expect(result).toEqual(null);
});

it('should return invoice integration type', () => {
    const result = resolveIntegrationType({
        invoiceID: 'mock invoiceID',
        invoiceAccessToken: 'mock token',
        someField: 'someValue'
    });
    expect(result).toEqual(IntegrationType.invoice);
});

it('should return invoiceTemplate integration type', () => {
    const result = resolveIntegrationType({
        invoiceTemplateID: 'mock invoiceTemplateID',
        invoiceTemplateAccessToken: 'mock token',
        someField: 'someValue'
    });
    expect(result).toEqual(IntegrationType.invoiceTemplate);
});

it('should return customer integration type', () => {
    const result = resolveIntegrationType({
        customerID: 'mock customer',
        customerAccessToken: 'mock token',
        someField: 'someValue'
    });
    expect(result).toEqual(IntegrationType.customer);
});
