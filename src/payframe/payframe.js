import './app.scss';
import 'core-js/es6/promise';
import 'core-js/es6/object';
import React from 'react';
import ReactDOM from 'react-dom';
import ready from '../utils/domReady';
import Modal from './components/Modal';
import MessageModal from './components/MessageModal';
import ConfigLoader from './loaders/ConfigLoader';
import Invoice from './backend-communication/Invoice';
import Child from '../communication/Child';
import settings from '../settings';
import StateResolver from './StateResolver';
import TokenizerScript from './elements/TokenizerScript';

ready(function(origin) {
    const overlay = document.querySelector('.checkout--overlay');
    const loading = document.querySelector('.loading');
    const modal = document.getElementById('modal');
    const payformHost = origin;
    const child = new Child();
    child.then((transport) => {
        let params;

        StateResolver.resolve(transport)
            .then((state) => {
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

        function renderMessageModal(type, error, data) {
            loading.parentNode.removeChild(loading);
            ReactDOM.render(
                <MessageModal type={type} error={error.message} popupMode={data.popupMode} setClose={setClose}/>,
                modal
            );
        }

        function renderModal(data) {
            overlay.style.opacity = '0.6';
            setTimeout(() => {
                ConfigLoader.load().then((config) => {
                        const tokenizerScript = new TokenizerScript(config.tokenizerEndpoint);
                        return Promise.all([
                            tokenizerScript.render(),
                            Invoice.getInvoice(config.capiEndpoint, data.invoiceID, data.invoiceAccessToken)
                        ]).then((response) => {
                            const invoice = response[1];
                            switch (invoice.status) {
                                case 'unpaid':
                                    Object.assign(data, {
                                        currency: invoice.currency,
                                        amount: String(Number(invoice.amount) / 100)
                                    });
                                    loading.parentNode.removeChild(loading);
                                    ReactDOM.render(
                                        <Modal invoiceAccessToken={data.invoiceAccessToken} capiEndpoint={config.capiEndpoint} invoiceID={data.invoiceID} defaultEmail={data.email} logo={data.logo} amount={data.amount} currency={data.currency} name={data.name} description={data.description} payformHost={payformHost} setCheckoutDone={setCheckoutDone} setClose={setClose} popupMode={data.popupMode} payButtonLabel={data.payButtonLabel}/>,
                                        modal
                                    );
                                    break;
                                case 'cancelled':
                                    renderMessageModal('error', {message: `Invoice was cancelled. ${invoice.reason}`}, data);
                                    break;
                                case 'paid':
                                    renderMessageModal('success', {message: 'Invoice was paid.'}, data);
                                    break;
                                case 'fulfilled':
                                    renderMessageModal('error', {message: `Invoice was fulfilled.`}, data);
                                    break;
                                case 'refunded':
                                    renderMessageModal('success', {message: `Invoice was cancelled and refunded.`}, data);
                                    break;
                            }
                        });
                    }).catch((error) => {
                        renderMessageModal('error', error, data);
                    });
            }, 300);
        }
    });
});
