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
        search.length > 1 ? Object.assign(params, JSON.parse(`{"${decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"')}"}`)) : undefined;
    }

    const styleLink = new StyleLink();
    styleLink.render();

    let is3DSInProgress = false;
    let sourceWindow = undefined;

    const set3DSStatus = (state) => {
        is3DSInProgress = state;
    };

    const setCheckoutDone = () => {
        sourceWindow.source.postMessage({message: 'payment-done'}, sourceWindow.origin);
    };

    function renderModal(data) {
        if (Utils.isSafari()) {
            styleLink.rerender();
        }

        ConfigLoader.load(data.payformHost).then((config) => {
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
                               set3DSStatus={set3DSStatus}
                               is3DSInProgress={is3DSInProgress}
                               setCheckoutDone={setCheckoutDone}
                        />,
                        root
                    );
                },
                error => console.error(error));
        });
    }

    if (isMobile.any) {
        window.addEventListener('message', (event) => {
            if (event.data.message === 'init-transport') {
                sourceWindow = event;
            }
        });
    }

    window.addEventListener('message', (event) => {
        switch (event.data.type) {
            case 'finish3ds': {
                set3DSStatus(false);
                ParentCommunicator.send({type: 'finish3ds'});
                renderModal(params);
                break;
            }
        }
    });

    Listener.addListener(message => {
        switch (message.type) {
            case 'init-payform':
                renderModal(message.data);
                break;
        }
    });

    if (isMobile.any) {
        renderModal(params);
    }
});
