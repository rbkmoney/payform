'use strict';

const express = require('express');
const app = express();
const router = express.Router();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'PUT');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Request-ID');
    next();
});

router.route('/processing/payment_tools').post((req, res) => res.json({
    token: 'token',
    session: 'sessionToken'
}));

router.route('/payment_tool_endpoint').post((req, res) => {
    console.log('call payment tool endpoint');
    res.send('Ok');
});

router.route('/events_endpoint').get((req, res) => {
    console.log('InvoiceId', req.param('invoiceId'));
    res.json([
        {
            id: 1,
            createdAt: 'datetime',
            eventType: 'paymentStatusChanged',
            status: 'pending'
        },
        {
            id: 2,
            createdAt: 'datetime',
            eventType: 'invoiceStatusChanged',
            status: 'paid'
        },
    ]);
});

app.use('/', router);

app.use('/', express.static(__dirname + '/public'));

app.listen(7051);
