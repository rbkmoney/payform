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

router.route('/init_endpoint').post((req, res) => {
    res.send('Ok');
});

let is3DS = true;
router.route('/events_endpoint').get((req, res) => {
    let result = {};
    if (is3DS) {
        result = [
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
        is3DS = false;
    } else {
        result = [{
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
        is3DS = true;
    }
    res.json(result);
});

app.use('/', router);

app.use('/', express.static(__dirname + '/public'));

app.listen(7051);
