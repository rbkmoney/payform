import './app.scss';
import 'core-js/es6/promise';
import 'core-js/es6/object';
import React from 'react';
import ReactDOM from 'react-dom';
import ready from '../utils/domReady';
import Modal from './components/Modal';
import ConfigLoader from './loaders/ConfigLoader';
import Invoice from './backend-communication/Invoice';
import Child from '../communication/Child';
import settings from '../settings';
import StateResolver from './StateResolver';

ready(function (origin) {
    const overlay = document.querySelector('.checkout--overlay');
    const modal = document.getElementById('modal');
    const payformHost = origin;
    const child = new Child();
    child.then((transport) => {
        let params;

        StateResolver.resolve(transport).then((state) => {
            params = state;
            renderModal(state);
        });

        function setCheckoutDone() {
            setTimeout(() => {
                transport.emit('payment-done');
                transport.destroy();
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
                if (params.popupMode) {
                    window.close();
                }
            }, 300);
        }

        function renderModal(data) {
            overlay.style.opacity = '0.6';
            setTimeout(() => {
                ConfigLoader.load().then((config) => {
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
                                       payformHost={payformHost}
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
