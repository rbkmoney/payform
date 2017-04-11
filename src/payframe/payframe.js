import './app.scss';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import StyleLink from './elements/StyleLink';
import ready from '../utils/domReady';
import Listener from '../communication/Listener';
import Utils from '../utils/Utils';
import Modal from './components/Modal';
import ParentCommunicator from '../communication/ParentCommunicator';
import ConfigLoader from './loaders/ConfigLoader';
import Invoice from './backend-communication/Invoice';

ready(function () {
    const styleLink = new StyleLink();
    styleLink.render();

    let is3DSInProgress = false;

    function set3DSStatus(state) {
        is3DSInProgress = state;
    }

    function renderModal(data, isResumed) {
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
                               endpointInit={data.endpointInit}
                               endpointEvents={data.endpointEvents}
                               invoiceID={data.invoiceID}
                               orderId={data.orderId}
                               logo={data.logo}
                               amount={data.amount}
                               currency={data.currency}
                               buttonColor={data.buttonColor}
                               name={data.name}
                               payformHost={data.payformHost}
                               isResume={isResumed}
                               set3DSStatus={set3DSStatus}
                               is3DSInProgress={is3DSInProgress}
                        />,
                        root
                    );
                },
                error => console.error(error));
        });
    }

    function checkPayformState(params) {
        if (params) {
            renderModal(params, is3DSInProgress);
        } else {
            const search = location.search.substring(1);
            if (search.length > 1) {
                const data = search.length > 1 ? JSON.parse(`{"${decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"')}"}`) : undefined;
                renderModal(data, is3DSInProgress);
            }
        }

    }

    window.addEventListener('message', (message) => {
        switch (message.data.type) {
            case 'finish3ds': {
                set3DSStatus(false);
                ParentCommunicator.send({type: 'finish3ds'});
                checkPayformState();
                break;
            }
        }
    });

    Listener.addListener(message => {

        switch (message.type) {
            case 'init-payform':
                checkPayformState(message.data);
                break;
        }
    });

    checkPayformState();
});
