import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import StyleLink from './elements/StyleLink';
import ready from '../utils/domReady';
import Listener from '../communication/Listener';
import Utils from '../utils/Utils';
import Modal from './components/Modal';

ready(function () {
    const styleLink = new StyleLink();
    styleLink.render();

    Listener.addListener(message => {
        if (message.type === 'init-payform' || message.type === 'resume') {
            if (Utils.isSafari()) {
                styleLink.rerender();
            }

            ReactDOM.render(
                <Modal publicKey={message.data.key}
                       endpointInit={message.data.endpointInit}
                       endpointEvents={message.data.endpointEvents}
                       invoiceId={message.data.invoiceId}
                       orderId={message.data.orderId}
                       logo={message.data.logo}
                       amount={message.data.amount}
                       currency={message.data.currency}
                       buttonColor={message.data.buttonColor}
                       name={message.data.name}/>,
                document.getElementById('root')
            );

            // const payform = new Payform(message.data);
            // const isResume = message.type === 'resume';
            // payform.render(isResume);
        }
    });
});
