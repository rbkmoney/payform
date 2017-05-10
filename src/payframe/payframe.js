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
    const overlay = document.querySelector('.checkout--overlay');
    const modal = document.getElementById('modal');
    const child = new Child();
    child.then((transport) => {
        let params;
        transport.on('init-payform', (data) => {
            params = data;
            renderModal(data)
        });

        function setCheckoutDone() {
            setTimeout(() => {
                transport.emit('payment-done');

                if (isMobile.any) {
                    window.close();
                }
            }, settings.closeFormTimeout)
        }

        function setClose() {
            ReactDOM.unmountComponentAtNode(modal);
            overlay.style.opacity = '0';
            setTimeout(() => {
                transport.emit('close');
                transport.destroy();
            }, 300);

        }

        function renderModal(data) {
            overlay.style.opacity = '0.6';
            setTimeout(() => {
                ConfigLoader.load(data.payformHost).then((config) => {
                Invoice.getInvoice(config.capiEndpoint, data.invoiceID, data.invoiceAccessToken).then((response) => {
                        Object.assign(data, {
                            currency: response.currency,
                            amount: String(Number(response.amount) / 100)
                        });
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
                            modal
                        );
                    },
                    error => console.error(error));
            });
            }, 300)
        }

        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                renderModal(params);
            }
        });
    });
});
