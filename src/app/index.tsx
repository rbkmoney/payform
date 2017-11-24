import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/main.scss';
import './styles/forms.scss';
import { ConfigResolver } from './config/config-resolver';
import { Child } from '../communication-ts/child';
import { Container } from './components';
import { configureStore } from './configure-store';
import { finalize } from './finalize-app';

Child.resolve()
    .then((transport) =>
        Promise.all([
            transport,
            ConfigResolver.resolve(transport)
        ]))
    .then((res) => {
        const app = document.getElementById('app');
        const store = configureStore({});
        store.subscribe(() => {
            const state = store.getState();
            if (state.result) {
                finalize(state.result, res[0], app);
            }
        });
        ReactDOM.render(
            <Provider store={store}>
                <Container/>
            </Provider>,
            app
        );
    })
    .catch((error) => {
        throw new Error(error); // TODO need to implement
    });
