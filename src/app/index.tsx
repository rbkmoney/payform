import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/main.scss';
import './styles/forms.scss';
import { configureStore } from './configure-store';
import { App } from './components/app';
import { finalize } from './finalize';
import { Child } from '../communication-ts';
import { ConfigResolver } from './config';

Child.resolve()
    .then((transport) =>
        Promise.all([
            transport,
            ConfigResolver.resolve(transport)
        ]))
    .then((res) => {
        const app = document.getElementById('app');
        const store = configureStore({
            config: res[1]
        });
        store.subscribe(() => {
            const state = store.getState();
            if (state.result) {
                finalize(state, res[0], app);
            }
        });
        ReactDOM.render(
            <Provider store={store}>
                <App/>
            </Provider>,
            app
        );
    });
