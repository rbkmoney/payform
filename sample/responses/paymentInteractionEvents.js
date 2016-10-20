const eventInvoiceCreated = require('./eventInvoiceCreated');
const eventPaymentStart = require('./eventPaymentStart');

module.exports = [
    eventInvoiceCreated,
    eventPaymentStart,
    {
        id: 1,
        createdAt: 'datetime',
        eventType: 'EventInvoicePaymentInteractionRequested',
        paymentID: 'e23d113',
        userInteraction: {
            interactionType: 'Redirect',
            request: {
                requestType: 'BrowserPostRequest',
                uriTemplate: 'http://localhost:7052/postRequestUrl',
                form: [
                    {
                        key: 'PaReq',
                        template: 'test1'
                    },
                    {
                        key: 'MD',
                        template: 'test2'
                    },
                    {
                        key: 'TermUrl',
                        template: 'https://api.rbkmoney.com/private/tinkoff/cb{?termination_uri}'
                    }
                ]
            }
        }
    }
];