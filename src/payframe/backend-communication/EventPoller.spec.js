import chaiAsPromised from 'chai-as-promised';
import EventPoller from './EventPoller';
chai.use(chaiAsPromised);

describe('EventPoller', function () {

    beforeEach(function () {
        this.fetchStub = sinon.stub(window, 'fetch');
    });

    afterEach(function () {
        fetch.restore();
    });

    describe('#pollEvents()', function () {

        it('should be a promise', function () {
            EventPoller.pollEvents('http://api.rbk.fake', 'invoiceID', 'token')
                .should.to.be.a('promise');
        });

        it('should reject when call without params', function (done) {
            EventPoller.pollEvents().should.be.rejected.notify(done);
        });

        it('should return success result when changeType InvoiceStatusChanged with status paid', function (done) {
            const events = [{
                createdAt: '2017-05-19T05:03:11.953923Z',
                id: 8,
                changes: [{
                    createdAt: '2017-05-19T05:03:11.953923Z',
                    changeType: 'InvoiceStatusChanged',
                    id: 8,
                    status: 'paid'
                }]
            }];

            const res = new Response(JSON.stringify(events), {status: 200});
            fetch.returns(Promise.resolve(res));

            const expected = {
                type: 'success'
            };

            EventPoller.pollEvents('http://api.rbk.fake', 'invoiceID', 'token')
                .should.become(expected).notify(done);
        });

        it('should return interact result when changeType PaymentInteractionRequested', function (done) {
            const events = [{
                id: 6,
                createdAt: '2017-05-19T16:16:54.038165Z',
                changes: [{
                    createdAt: '2017-05-19T16:16:54.038165Z',
                    changeType: 'PaymentInteractionRequested',
                    id: 6,
                    paymentID: '1',
                    userInteraction: {
                        interactionType: 'Redirect',
                        request: {
                            form: [
                                {
                                    key: 'TermUrl',
                                    template: 'http://wrapper.rbk.test:8080/mocketbank/term_url%7B%3Ftermination_uri%7D'
                                },
                                {
                                    key: 'PaReq',
                                    template: 'paReq'
                                },
                                {
                                    key: 'MD',
                                    template: 'MPI-qcVvPA757o1'
                                }
                            ],
                            requestType: 'BrowserPostRequest',
                            uriTemplate: 'http://3ds-mock.rbk.test:8080/mpi/acs'
                        }
                    }
                }]
            }];

            const res = new Response(JSON.stringify(events), {status: 200});
            fetch.returns(Promise.resolve(res));

            const expected = {
                type: 'interact',
                data: {
                    form: [
                        {
                            key: 'TermUrl',
                            template: 'http://wrapper.rbk.test:8080/mocketbank/term_url%7B%3Ftermination_uri%7D'
                        },
                        {
                            key: 'PaReq',
                            template: 'paReq'
                        },
                        {
                            key: 'MD',
                            template: 'MPI-qcVvPA757o1'
                        }
                    ],
                    requestType: 'BrowserPostRequest',
                    uriTemplate: 'http://3ds-mock.rbk.test:8080/mpi/acs'
                }
            };

            EventPoller.pollEvents('http://api.rbk.fake', 'invoiceID', 'token')
                .should.become(expected).notify(done);
        });
    });

    describe('#prepareResult()', function () {

        it('should return success type', function () {
            const change = {
                createdAt: '2017-05-19T05:03:11.953923Z',
                changeType: 'InvoiceStatusChanged',
                id: 8,
                status: 'paid'
            };

            const expected = {
                type: 'success'
            };

            EventPoller.prepareResult('success', change).should.be.deep.equal(expected);
        });

        it('should return interact type', function () {
            const change = {
                createdAt: '2017-05-19T16:16:54.038165Z',
                changeType: 'PaymentInteractionRequested',
                id: 6,
                paymentID: '1',
                userInteraction: {
                    interactionType: 'Redirect',
                    request: {
                        form: [
                            {
                                key: 'TermUrl',
                                template: 'http://wrapper.rbk.test:8080/mocketbank/term_url%7B%3Ftermination_uri%7D'
                            },
                            {
                                key: 'PaReq',
                                template: 'paReq'
                            },
                            {
                                key: 'MD',
                                template: 'MPI-qcVvPA757o1'
                            }
                        ],
                        requestType: 'BrowserPostRequest',
                        uriTemplate: 'http://3ds-mock.rbk.test:8080/mpi/acs'
                    }
                }
            };

            const expected = {
                type: 'interact',
                data: {
                    form: [
                        {
                            key: 'TermUrl',
                            template: 'http://wrapper.rbk.test:8080/mocketbank/term_url%7B%3Ftermination_uri%7D'
                        },
                        {
                            key: 'PaReq',
                            template: 'paReq'
                        },
                        {
                            key: 'MD',
                            template: 'MPI-qcVvPA757o1'
                        }
                    ],
                    requestType: 'BrowserPostRequest',
                    uriTemplate: 'http://3ds-mock.rbk.test:8080/mpi/acs'
                }
            };

            EventPoller.prepareResult('interact', change, 'invoiceID', 'invoiceAccessToken').should.be.deep.equal(expected);
        });
    });

    describe('#requestToEndpoint()', function () {

        it('should be a promise', function () {
            EventPoller.requestToEndpoint('http://api.rbk.test:8080', 'invoiceID', 'token')
                .should.to.be.a('promise');
        });

        it('should call fetch with right params', function () {
            EventPoller.requestToEndpoint('http://api.rbk.fake', 'invoiceID', 'token');
            sinon.assert.calledWith(this.fetchStub,
                'http://api.rbk.fake/v1/processing/invoices/invoiceID/events?limit=100',
                {
                    headers: {
                        'Authorization': 'Bearer token',
                        'Content-Type': 'application/json;charset=utf-8',
                        'X-Request-ID': sinon.match.string
                    },
                    method: 'GET'
                });
        });

        it('should resolve events when response status 200', function (done) {
            const events = [{
                id: 6,
                createdAt: '2017-05-19T05:02:59.394901Z',
                changes: [{
                    createdAt: '2017-05-19T05:02:59.394901Z',
                    changeType: 'InvoiceCreated',
                    id: 1,
                    invoice: {
                        amount: 305416,
                        createdAt: '2017-05-19T05:02:59.101754Z',
                        currency: 'RUB',
                        description: 'Postman',
                        dueDate: '2017-06-09T08:38:00Z',
                        id: 'qbjo8EYJiy',
                        metadata: {
                            order_id: 'Postman order {{timestamp}}'
                        },
                        product: 'Rubber Duck',
                        shopID: 1,
                        status: 'unpaid'
                    }
                }]
            }];

            const res = new Response(JSON.stringify(events), {status: 200});
            fetch.returns(Promise.resolve(res));

            EventPoller.requestToEndpoint('http://api.rbk.fake', 'invoiceID', 'token')
                .should.become(events).notify(done);
        });

        it('should reject error when response status 404', function (done) {
            const error = {
                message: 'Invoice not found'
            };

            const res = new Response(JSON.stringify(error), {status: 404});
            fetch.returns(Promise.resolve(res));

            EventPoller.requestToEndpoint('http://api.rbk.fake', 'invoiceID', 'token')
                .should.be.rejected.notify(done);
        });
    });

    describe('#isSuccess()', function () {

        it('should return false when wrong changeType', function () {
            const change = {
                createdAt: '2017-05-19T05:03:11.953923Z',
                changeType: 'WrongType',
                id: 8,
                status: 'paid'
            };

            EventPoller.isSuccess(change).should.be.false;
        });

        it('should return false when wrong status', function () {
            const change = {
                createdAt: '2017-05-19T05:03:11.953923Z',
                changeType: 'InvoiceStatusChanged',
                id: 8,
                status: 'unpaid'
            };

            EventPoller.isSuccess(change).should.be.false;
        });

        it('should return true when changeType InvoiceStatusChanged with status paid', function () {
            const change = {
                createdAt: '2017-05-19T05:03:11.953923Z',
                changeType: 'InvoiceStatusChanged',
                id: 8,
                status: 'paid'
            };

            EventPoller.isSuccess(change).should.be.true;
        });
    });

    describe('#isError()', function () {

        it('should return false when wrong changeType', function () {
            const change = {
                createdAt: '2017-05-19T05:03:11.953923Z',
                changeType: 'WrongType',
                id: 8,
                status: 'failed'
            };

            EventPoller.isError(change).should.be.false;
        });

        it('should return false when wrong status', function () {
            const change = {
                createdAt: '2017-05-19T05:03:10.961359Z',
                changeType: 'PaymentStatusChanged',
                id: 5,
                paymentID: '1',
                status: 'processed'
            };

            EventPoller.isError(change).should.be.false;
        });

        it('should return true when changeType PaymentStatusChanged with status failed', function () {
            const change = {
                createdAt: '2017-05-19T05:03:10.961359Z',
                changeType: 'PaymentStatusChanged',
                id: 5,
                paymentID: '1',
                status: 'failed'
            };

            EventPoller.isError(change).should.be.true;
        });

        it('should return true when changeType InvoiceStatusChanged with status cancelled', function () {
            const change = {
                createdAt: '2017-05-19T05:03:10.961359Z',
                changeType: 'InvoiceStatusChanged',
                id: 5,
                paymentID: '1',
                status: 'cancelled'
            };

            EventPoller.isError(change).should.be.true;
        });
    });

    describe('#isInteract()', function () {

        it('should return false when wrong changeType', function () {
            const change = {
                createdAt: '2017-05-19T05:03:11.953923Z',
                changeType: 'WrongType',
                id: 8,
                status: 'failed'
            };

            EventPoller.isInteract(change).should.be.false;
        });

        it('should return true when changeType PaymentInteractionRequested', function () {
            const change = {
                createdAt: '2017-05-19T05:03:11.953923Z',
                changeType: 'PaymentInteractionRequested',
                id: 8
            };

            EventPoller.isInteract(change).should.be.true;
        });
    });

    describe('#getLastElement()', function () {

        it('should return last element', function () {
            const events = [1, 2, 3];
            EventPoller.getLastElement(events).should.to.equal(3);
        });
    });

    //describe('#getErrorMessage()', function() {
    //    const locale = {
    //        'Invalid Card': 'Недопустимая карта'
    //    };
    //
    //    it('should return Недопустимая карта from locale', function () {
    //        const error = {
    //            code: 'Invalid Card',
    //            message: 'Invalid Card'
    //        };
    //
    //        EventPoller.getErrorMessage(error, locale).should.to.equal('Недопустимая карта');
    //    });
    //
    //    it('should return CVV Match Fail when didn\'t found translation in locale ', function () {
    //        const error = {
    //            code: 'CVV Match Fail',
    //            message: 'CVV Match Fail'
    //        };
    //
    //        EventPoller.getErrorMessage(error, locale).should.to.equal('CVV Match Fail');
    //    });
    //});
});
