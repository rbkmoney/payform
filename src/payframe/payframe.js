import './app.scss';
import 'core-js/es6/promise';
import 'core-js/es6/object';
import 'core-js/es6/array';
import React from 'react';
import ReactDOM from 'react-dom';
import ready from '../utils/domReady';
import Payframe from './components/Payframe';
import Child from '../communication/Child';
import settings from '../settings';
import StateResolver from './StateResolver';
import ConfigLoader from './loaders/ConfigLoader';

ready(function(origin) {
    const modal = document.getElementById('modal');
    let data;

    const child = new Child();
    child.then((transport) => {

        function setCheckoutDone() {
            setTimeout(() => {
                transport.emit('payment-done');
                transport.destroy();
                if (data.popupMode) {
                    if (data.redirectUrl) {
                        location.replace(data.redirectUrl);
                    } else {
                        window.close();
                    }
                }
            }, settings.closeFormTimeout)
        }

        function setClose() {
            ReactDOM.unmountComponentAtNode(modal);
            setTimeout(() => {
                transport.emit('close');
                transport.destroy();
                if (data.popupMode) {
                    window.close();
                }
            }, 300);
        }

        return Promise.all([
            StateResolver.resolve(transport),
            ConfigLoader.load()
        ])
            .then(response => {
                data = response[0];
                ReactDOM.render(
                    <Payframe
                        payformHost={origin}
                        setCheckoutDone={setCheckoutDone}
                        setClose={setClose}
                        data={response[0]}
                        config={response[1]}
                    />,
                    modal
                );
            })
    });
});
