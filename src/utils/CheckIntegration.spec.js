import CheckIntegration from './CheckIntegration';

describe('CheckIntegration', function () {
    const checkDocs = `You can learn about the available configuration options in the Checkout docs: https://rbkmoney.github.io/docs/integrations/checkout`;
    const criticalError = 'RbkmoneyCheckout.configure: Critical error! Check your console for more info.';

    beforeEach(function () {
        this.consoleStub = sinon.stub(CheckIntegration, 'log');
        this.alertStub = sinon.stub(CheckIntegration, 'alert');
    });

    afterEach(function () {
        CheckIntegration.log.restore();
        CheckIntegration.alert.restore();
    });

    describe('#makeDictionary()', function() {
        it('should return dictionary for matcher', function() {
            const dictionary = 'invoiceAccessToken invoiceID invoiceTemplateID email logo name label description payButtonLabel popupMode locale opened closed finished';

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

    describe('#log()', function() {
       it('message should be error and contain text about missing invoiceID', function() {
           const props = {
                invoiceAccessToken: 'token'
            };

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'error', `RbkmoneyCheckout.configure: 'invoiceID' is a required option, but was not found.`);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });

       it('message should be error and contain text about missing invoiceID', function() {
           const props = {
                invoicceID: 'invoice',
                invoiceAccessToken: 'token'
            };

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'warn', `RbkmoneyCheckout.configure: Unrecognized option 'invoicceID'. Did you mean 'invoiceID'?`);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });

       it('message should be error and contain text about missing invoiceAccessToken', function() {
           const props = {
                invoiceID: 'invoice'
            };

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'error', `RbkmoneyCheckout.configure: 'invoiceAccessToken' is a required option, but was not found.`);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });

       it('message should be error and contain text about missing invoiceAccessToken', function() {
           const props = {
                invoicceID: 'invoice',
                invoiceAcсcessToken: 'token'
            };

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'warn', `RbkmoneyCheckout.configure: Unrecognized option 'invoiceAcсcessToken'. Did you mean 'invoiceAccessToken'?`);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });

       it('message should be warn and contain text about Unrecognized option nema', function() {
           const props = {
                invoiceID: 'invoiceID',
                invoiceAccessToken: 'token',
                nema: 'Some company',
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

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'warn', `RbkmoneyCheckout.configure: Unrecognized option 'nema'. Did you mean 'name'?`);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });

       it('message should be warn and contain text about Unrecognized option emmail', function() {
           const props = {
                invoiceID: 'invoiceID',
                invoiceAccessToken: 'token',
                name: 'Some company',
                payButtonLabel: 'Pay',
                popupMode: false,
                emmail: 'email',
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

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'warn', `RbkmoneyCheckout.configure: Unrecognized option 'emmail'. Did you mean 'email'?`);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });

       it('message should be warn and contain text about Unrecognized option payBuuttonLabel', function() {
           const props = {
                invoiceID: 'invoiceID',
                invoiceAccessToken: 'token',
                nama: 'Some company',
                payBuuttonLabel: 'Pay',
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

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'warn', `RbkmoneyCheckout.configure: Unrecognized option 'payBuuttonLabel'. Did you mean 'payButtonLabel'?`);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });

       it('message should be warn and contain text about Unrecognized option popuppMode', function() {
           const props = {
                invoiceID: 'invoiceID',
                invoiceAccessToken: 'token',
                nama: 'Some company',
                payButtonLabel: 'Pay',
                popuppMode: false,
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

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'warn', `RbkmoneyCheckout.configure: Unrecognized option 'popuppMode'. Did you mean 'popupMode'?`);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });

       it('message should be warn and contain text about Unrecognized option locaale', function() {
           const props = {
                invoiceID: 'invoiceID',
                invoiceAccessToken: 'token',
                nama: 'Some company',
                payButtonLabel: 'Pay',
                popupMode: false,
                locaale: 'auto',
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

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'warn', `RbkmoneyCheckout.configure: Unrecognized option 'locaale'. Did you mean 'locale'?`);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });

       it('message should be warn and contain text about Unrecognized option oopened', function() {
           const props = {
                invoiceID: 'invoiceID',
                invoiceAccessToken: 'token',
                nama: 'Some company',
                payButtonLabel: 'Pay',
                popupMode: false,
                oopened: function() {
                    console.log('Checkout on opened');
                },
                closed: function() {
                    console.log('Checkout on closed');
                },
                finished: function() {
                    location.reload();
                }
            };

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'warn', `RbkmoneyCheckout.configure: Unrecognized option 'oopened'. Did you mean 'opened'?`);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });

       it('message should be warn and contain text about Unrecognized option cllosed', function() {
           const props = {
                invoiceID: 'invoiceID',
                invoiceAccessToken: 'token',
                nama: 'Some company',
                payButtonLabel: 'Pay',
                popupMode: false,
                opened: function() {
                    console.log('Checkout on opened');
                },
                cllosed: function() {
                    console.log('Checkout on closed');
                },
                finished: function() {
                    location.reload();
                }
            };

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'warn', `RbkmoneyCheckout.configure: Unrecognized option 'cllosed'. Did you mean 'closed'?`);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });

       it('message should be warn and contain text about Unrecognized option finnished', function() {
           const props = {
                invoiceID: 'invoiceID',
                invoiceAccessToken: 'token',
                nama: 'Some company',
                payButtonLabel: 'Pay',
                popupMode: false,
                opened: function() {
                    console.log('Checkout on opened');
                },
                closed: function() {
                    console.log('Checkout on closed');
                },
                finnished: function() {
                    location.reload();
                }
            };

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'warn', `RbkmoneyCheckout.configure: Unrecognized option 'finnished'. Did you mean 'finished'?`);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });

       it('message should be warn and contain text about Unrecognized option testerror', function() {
           const props = {
                invoiceID: 'invoiceID',
                invoiceAccessToken: 'token',
                name: 'Some company',
                payButtonLabel: 'Pay',
                popupMode: false,
                testerror: true,
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

            CheckIntegration.check(props);

           sinon.assert.calledWith(this.consoleStub, 'warn', `RbkmoneyCheckout.configure: Unrecognized option 'testerror'. `);
           sinon.assert.calledWith(this.consoleStub, 'warn', checkDocs);
       });
    });

    describe('#alert()', function() {
        it('alert critical error when invoiceAccessToken is unrecognized', function() {
            const props = {
                invoiceID: 'invoice'
            };

            CheckIntegration.check(props);

            sinon.assert.calledWith(this.alertStub, criticalError);
        });

        it('alert critical error when invoiceID is unrecognized', function() {
            const props = {
                invoiceAccessToken: 'token'
            };

            CheckIntegration.check(props);

            sinon.assert.calledWith(this.alertStub, criticalError);
        });
    })
});