import './app.scss';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import isMobile from 'ismobilejs';
import StyleLink from './elements/StyleLink';
import ready from '../utils/domReady';
import Utils from '../utils/Utils';
import Modal from './components/Modal';
import ConfigLoader from './loaders/ConfigLoader';
import Invoice from './backend-communication/Invoice';
import Child from '../communication-2/Child';
import settings from '../settings';

ready(function () {
    const styleLink = new StyleLink();
    styleLink.render();

    const child = new Child();
    child.then((transport) => {
        let params;
        transport.on('init-payform', (data) => {
            params = data;
            renderModal(data)
        });

        function setCheckoutDone() {
            if (isMobile.any) {
                window.close();
            }
            setTimeout(() => transport.emit('payment-done'), settings.closeFormTimeout);
        }

        function setClose() {
            transport.emit('close');
        }

        function renderModal(data) {
            if (Utils.isSafari()) {
                styleLink.rerender();
            }
            ConfigLoader.load(data.payformHost).then((config) => {
                Invoice.getInvoice(config.capiEndpoint, data.invoiceID, data.invoiceAccessToken).then((response) => {
                        Object.assign(data, {
                            currency: response.currency,
                            amount: String(Number(response.amount) / 100)
                        });
                        const root = document.getElementById('root');
                        ReactDOM.render(
                            <Modal invoiceAccessToken={data.invoiceAccessToken}
                                   capiEndpoint={config.capiEndpoint}
                                   tokenizerEndpoint={config.tokenizerEndpoint}
                                   invoiceID={data.invoiceID}
                                   logo={data.logo}
                                   amount={data.amount}
                                   currency={data.currency}
                                   name={data.name}
                                   payformHost={data.payformHost}
                                   setCheckoutDone={setCheckoutDone}
                                   setClose={setClose}
                            />,
                            root
                        );
                    },
                    error => console.error(error));
            });
        }

        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                renderModal(params);
            }
        });
    });
});
