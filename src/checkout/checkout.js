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

ready(function () {
    const styleLink = new StyleLink();
    styleLink.render();

    function renderModal(data, isResumed) {
        if (Utils.isSafari()) {
            styleLink.rerender();
        }
        ConfigLoader.load().then((config) => {
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
