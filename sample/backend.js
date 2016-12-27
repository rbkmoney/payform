'use strict';

const express = require('express');
const app = express();
const router = express.Router();

const paymentFailedEvents = require('./responses/paymentFailedEvents');
const paymentSuccessEvents = require('./responses/paymentSuccessEvents');
const paymentInteractionEvents = require('./responses/paymentInteractionEvents');

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

router.route('/events_endpoint').get((req, res) => {
    res.json(paymentSuccessEvents);
});

// let is3DS = true;
// router.route('/events_endpoint').get((req, res) => {
//     let result = {};
//     if (is3DS) {
//         result = paymentInteractionEvents;
//         is3DS = false;
//     } else {
//         result = paymentSuccessEvents;
//         is3DS = true;
//     }
//     res.json(result);
// });

// router.route('/events_endpoint').get((req, res) => {
//     res.json(paymentFailedEvents);
// });

router.route('/success_endpoint').post((req, res) => res.send('success'));

router.route('/failed_endpoint').post((req, res) => res.send('failed'));

app.use('/', router);

app.use('/', express.static(__dirname + '/public'));

app.listen(7051);
