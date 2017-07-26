import getIntefrationType from './getIntegrationType';

describe('getIntegrationType()', function() {
    it('should return template type', () => {
        const config = {
            invoiceTemplateID: 'invoiceTemplateID',
            invoiceTemplateAccessToken: 'invoiceTemplateAccessToken'
        };

        getIntefrationType(config).should.to.equal('template');
    });

    it('should return default type', () => {
        const config = {
            invoiceID: 'invoiceID',
            invoiceAccessToken: 'invoiceAccessToken'
        };

        getIntefrationType(config).should.to.equal('default');
    });

    it('should return error type', () => {
        const config = {
            invoiceID: 'invoiceID',
            invoiceTemplateAccessToken: 'invoiceTemplateAccessToken'
        };

        getIntefrationType(config).should.to.equal('error');
    });

    it('should return error type', () => {
        const config = {
            invoiceID: 'invoiceID'
        };

        getIntefrationType(config).should.to.equal('error');
    });

    it('should return error type', () => {
        const config = {
            invoiceTemplateID: 'invoiceTemplateID',
        };

        getIntefrationType(config).should.to.equal('error');
    });
});