import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/main.scss';
import './styles/forms.scss';
import { configureStore } from './configure-store';
import { App } from './components/app';
import { finalize } from './finalize';
import { Child } from '../communication';
import { resolveConfig } from './config';

Child.resolve()
    .then((transport) =>
        Promise.all([
            transport,
            resolveConfig(transport)
        ]))
    .then((res) => {
        const [transport, config] = res;
        const app = document.getElementById('app');
        const store = configureStore({config});
        store.subscribe(() => {
            const state = store.getState();
            if (state.result) {
                finalize(state, transport, app);
            }
        });
        ReactDOM.render(
            <Provider store={store}>
                <App/>
            </Provider>,
            app
        );
    });
