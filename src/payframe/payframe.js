import './app.scss';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import isMobile from 'ismobilejs';
import StyleLink from './elements/StyleLink';
import ready from '../utils/domReady';
import Listener from '../communication/Listener';
import Utils from '../utils/Utils';
import Modal from './components/Modal';
import ParentCommunicator from '../communication/ParentCommunicator';
import ConfigLoader from './loaders/ConfigLoader';
import Invoice from './backend-communication/Invoice';

ready(function () {
    const params = {};
    const search = location.search.substring(1);
    if (search.length > 1) {
        Object.assign(params, JSON.parse(`{"${decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"')}"}`));
    }
    let sourceWindow = undefined;

    const styleLink = new StyleLink();
    styleLink.render();

    function setCheckoutDone() {
        sourceWindow.source.postMessage(`{"type": "payment-done", "invoiceID": "${params.invoiceID}"}`, sourceWindow.origin);
    }

    function renderModal(data) {
        if (Utils.isSafari()) {
            styleLink.rerender();
        }

        ConfigLoader.load(data.payformHost)
            .then((config) => {
                Invoice.getInvoice(config.capiEndpoint, data.invoiceID, data.invoiceAccessToken)
                    .then((response) => {

                        Object.assign(data, {
                            currency: response.currency,
                            amount:  String(Number(response.amount) / 100)
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
                                   buttonColor={data.buttonColor}
                                   name={data.name}
                                   payformHost={data.payformHost}
                                   setCheckoutDone={setCheckoutDone}
                            />,
                            root
                        );
                    },
                    error => console.error(error));
            });
    }

    Listener.addListener((message, event) => {
        switch (message.type) {
            case 'init-payform':
                renderModal(message.data);
                break;
            case 'init-transport':
                sourceWindow = event;
                break;
            case 'finish3ds':
                if (isMobile.any) {
                    setCheckoutDone()
                } else {
                    ParentCommunicator.send({type: 'finish3ds'});
                }
                renderModal(params);
                break;
        }
    });

    if (isMobile.any) {
        renderModal(params);
    }

    if (!isMobile.any) {
        ParentCommunicator.send({
            type: 'payframe-ready',
            invoiceID: params.invoiceID
        });
    }
});
