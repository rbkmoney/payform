import './app.scss';
import 'core-js/es6/promise';
import 'core-js/es6/object';
import 'core-js/es6/array';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../redux/configureStore';
import { Provider } from 'react-redux';
import ready from '../utils/domReady';
import Payframe from './components/Payframe';
import Child from '../communication/Child';
import settings from '../settings';
import StateResolver from './StateResolver';
import ConfigLoader from './loaders/ConfigLoader';
import getIntegrationType from '../utils/getIntegrationType';

ready(function(origin) {
    const modal = document.getElementById('modal');
    const child = new Child();

    child.then((transport) => {
        function setCheckoutDone() {
            setTimeout(() => {
                transport.emit('payment-done');
                transport.destroy();
                if (this.popupMode) {
                    if (this.redirectUrl) {
                        location.replace(this.redirectUrl);
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
                if (this.popupMode) {
                    window.close();
                }
            }, 300);
        }

        return Promise.all([
            StateResolver.resolve(transport),
            ConfigLoader.load()
        ])
            .then(response => {
                const config = Object.assign({
                    integrationType: getIntegrationType(response[0]),
                    payformHost: origin
                }, response[1]);

                const store = configureStore({
                    config,
                    data: response[0]
                });

                ReactDOM.render(
                    <Provider store={store}>
                        <Payframe
                            setCheckoutDone={setCheckoutDone.bind(response[0])}
                            setClose={setClose.bind(response[0])}
                        />
                    </Provider>,
                    modal
                );
            })
    });
});
