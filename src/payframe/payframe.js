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

ready(function (origin) {
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
            }, settings.closeFormTimeout);
        }

        function setClose() {
            ReactDOM.unmountComponentAtNode(modal);
            setTimeout(() => {
                transport.emit('close');
                transport.destroy();
            }, 300);
        }

        return Promise.all([
            StateResolver.resolve(transport),
            ConfigLoader.load()
        ]).then((response) => {
            const initParams = response[0];
            const store = configureStore({
                appConfig: Object.assign({
                    host: origin
                }, response[1]),
                initParams,
                integration: {
                    type: getIntegrationType(initParams)
                }
            });

            store.subscribe(() => {
                const state = store.getState();
                if (state.result === 'close') {
                    setClose();
                } else if (state.result === 'done') {
                    setCheckoutDone.apply(initParams);
                }
                console.log(store.getState());
            });

            ReactDOM.render(
                <Provider store={store}>
                    <Payframe/>
                </Provider>,
                modal
            );
        });
    });
});
