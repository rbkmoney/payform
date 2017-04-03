import './app.scss';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import StyleLink from './elements/StyleLink';
import ready from '../utils/domReady';
import Listener from '../communication/Listener';
import Utils from '../utils/Utils';
import Modal from './components/Modal';
import StateWorker from './state/StateWorker';
import ParentCommunicator from '../communication/ParentCommunicator';
import ConfigLoader from './loaders/ConfigLoader';
import Invoice from './backend-communication/Invoice';

ready(function () {
    const styleLink = new StyleLink();
    styleLink.render();

    function renderModal(data, isResumed) {
        if (Utils.isSafari()) {
            styleLink.rerender();
        }
        ConfigLoader.load().then((config) => {
            Invoice.getInvoice(config.capiEndpoint, data.invoiceId, data.accessToken)
                .then((response) => {

                    Object.assign(data, {
                        currency: response.currency,
                        amount:  String(Number(response.amount) / 100)
                    });

                    ReactDOM.render(
                        <Modal accessToken={data.accessToken}
                               capiEndpoint={config.capiEndpoint}
                               tokenizerEndpoint={config.tokenizerEndpoint}
                               endpointInit={data.endpointInit}
                               endpointEvents={data.endpointEvents}
                               invoiceId={data.invoiceId}
                               orderId={data.orderId}
                               logo={data.logo}
                               amount={data.amount}
                               currency={data.currency}
                               buttonColor={data.buttonColor}
                               name={data.name}
                               locationHost={data.locationHost}
                               payformHost={data.payformHost}
                               isResume={isResumed}
                        />,
                        document.getElementById('root')
                    );
                },
                error => console.error(error));
        });
    }

    function checkPayformState() {
        const payFormData = StateWorker.loadState();
        if (payFormData) {
            if (StateWorker.is3DSInProgress(payFormData.invoiceId)) {
                ParentCommunicator.send({type: 'finish3ds'});
                renderModal(payFormData, true);
            } else {
                StateWorker.flush();
            }
        }
    }

    Listener.addListener(message => {
        switch (message.type) {
            case 'init-payform':
                StateWorker.saveState(message.data);
                renderModal(message.data, false);
                break;
            case 'unload':
                StateWorker.flush();
                break;
        }
    });

    checkPayformState();
});
