const eventInvoiceCreated = require('./eventInvoiceCreated');
const eventPaymentStart = require('./eventPaymentStart');

module.exports = [
    eventInvoiceCreated,
    eventPaymentStart,
    {
        createdAt: '2016-10-20T09:47:44.751220Z',
        eventType: 'EventPaymentStatusChanged',
        id: 4,
        paymentID: '1',
        status: 'failed'
    },
    {
        createdAt: '2016-10-20T09:47:54.776245Z',
        eventType: 'EventInvoiceStatusChanged',
        id: 5,
        status: 'cancelled'
    }
];
