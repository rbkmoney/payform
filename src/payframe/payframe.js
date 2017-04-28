import './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import isMobile from 'ismobilejs';
import ready from '../utils/domReady';
import Modal from './components/Modal';
import ConfigLoader from './loaders/ConfigLoader';
import Invoice from './backend-communication/Invoice';
import Child from '../communication/Child';
import settings from '../settings';

ready(function () {
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
            transport.destroy();
        }

        function renderModal(data) {
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
