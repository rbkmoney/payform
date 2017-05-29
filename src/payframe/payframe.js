import './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import ready from '../utils/domReady';
import Modal from './components/Modal';
import ConfigLoader from './loaders/ConfigLoader';
import Invoice from './backend-communication/Invoice';
import Child from '../communication/Child';
import ContextRecovery from '../communication/ContextRecovery';
import settings from '../settings';

ready(function () {
    const overlay = document.querySelector('.checkout--overlay');
    const modal = document.getElementById('modal');
    const child = new Child();
    const context = new ContextRecovery();

    child.then((transport) => {
        let params;

        transport.on('init-payform', (data) => {
                params = data;

                if (data.popupMode) {
                    sessionStorage.setItem('rbkmoney-checkout', JSON.stringify(params));
                }

                renderModal(data);
            });

        context.then((data) => {
            params = data;
            renderModal(params);
        });


        function setCheckoutDone() {
            sessionStorage.removeItem('rbkmoney-checkout');
            setTimeout(() => {
                transport.emit('payment-done');
                if (params.popupMode) {
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
                                   description={data.description}
                                   payformHost={data.payformHost}
                                   setCheckoutDone={setCheckoutDone}
                                   setClose={setClose}
                                   popupMode={data.popupMode}
                                   payButtonLabel={data.payButtonLabel}
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
