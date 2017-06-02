import CheckIntegration from './CheckIntegration';

describe('CheckIntegration', function () {

    describe('#makeDictionary()', function() {
        it('should return dictionary for matcher', function() {
            const dictionary = 'invoiceAccessToken invoiceID logo name label description payButtonLabel popupMode opened closed finished ';

            CheckIntegration.makeDictionary().should.be.equal(dictionary);
        });
    });

    describe('#check()', function() {
        it('should return true', function() {
            const props = {
                invoiceID: 'invoiceID',
                invoiceAccessToken: 'token',
                name: 'Some company',
                payButtonLabel: 'Pay',
                popupMode: false,
                opened: function() {
                    console.log('Checkout on opened');
                },
                closed: function() {
                    console.log('Checkout on closed');
                },
                finished: function() {
                    location.reload();
                }
            };

            CheckIntegration.check(props).should.be.equal(true);
        });

        it('should return false', function() {
            const props = {
                invoiceAccessToken: 'token'
            };

            CheckIntegration.check(props).should.be.equal(false);
        });
    });
});