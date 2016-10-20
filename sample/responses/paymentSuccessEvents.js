const eventInvoiceCreated = require('./eventInvoiceCreated');
const eventPaymentStart = require('./eventPaymentStart');

module.exports = [
    eventInvoiceCreated,
    eventPaymentStart,
    {
        id: 1,
        createdAt: 'datetime',
        eventType: 'EventPaymentStatusChanged',
        status: 'pending'
    }, {
        id: 2,
        createdAt: 'datetime',
        eventType: 'EventInvoiceStatusChanged',
        status: 'paid'
    }];
