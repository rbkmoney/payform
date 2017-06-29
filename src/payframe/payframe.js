import './app.scss';
import 'core-js/es6/promise';
import 'core-js/es6/object';
import React from 'react';
import ReactDOM from 'react-dom';
import ready from '../utils/domReady';
import Modal from './components/Modal';
import MessageModal from './components/MessageModal';
import ConfigLoader from './loaders/ConfigLoader';
import LocaleLoader from './loaders/LocaleLoader';
import Invoice from './backend-communication/Invoice';
import Child from '../communication/Child';
import settings from '../settings';
import StateResolver from './StateResolver';
import TokenizerScript from './elements/TokenizerScript';
import EventPoller from './backend-communication/EventPoller';

ready(function (origin) {
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
                    if (params.redirectUrl) {
                        location.replace(params.redirectUrl);
                    } else {
                        window.close();
                    }
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

        function renderMessageModal(error, popupMode, type) {
            loading.parentNode.removeChild(loading);
            ReactDOM.render(
                <MessageModal type={type} error={error.message} popupMode={popupMode} setClose={setClose}/>,
                modal
            );
        }

        function renderModal(data) {
            overlay.style.opacity = '0.6';
            ConfigLoader.load().then((config) => {
                const tokenizerScript = new TokenizerScript(config.tokenizerEndpoint);
                return Promise.all([
                    LocaleLoader.load(data.locale),
                    tokenizerScript.render(),
                    Invoice.getInvoice(config.capiEndpoint, data.invoiceID, data.invoiceAccessToken)
                ]).then((response) => {
                    const locale = response[0];
                    const invoice = response[2];
                    EventPoller.pollEvents(config.capiEndpoint, data.invoiceID, data.invoiceAccessToken, locale).then((event) => {
                        switch (invoice.status) {
                            case 'unpaid':
                                Object.assign(data, {
                                    currency: invoice.currency,
                                    amount: String(Number(invoice.amount) / 100)
                                });
                                loading.parentNode.removeChild(loading);
                                ReactDOM.render(
                                    <Modal
                                        invoiceAccessToken={data.invoiceAccessToken}
                                        capiEndpoint={config.capiEndpoint}
                                        invoiceID={data.invoiceID}
                                        defaultEmail={data.email}
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
                                        locale={locale}
                                        event={event}
                                    />,
                                    modal
                                );
                                break;
                            case 'cancelled':
                                renderMessageModal({message: `${locale['error.invoice.cancelled']} ${invoice.reason}`}, data.popupMode, 'error');
                                break;
                            case 'paid':
                                renderMessageModal({message: locale['error.invoice.paid']}, data.popupMode);
                                break;
                        }
                    });
                });
            }).catch((error) => {
                renderMessageModal(error, data.popupMode, 'error');
            });
        }
    });
});
