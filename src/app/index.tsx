import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/main.scss';
import './styles/forms.scss';
import { configureStore } from './configure-store';
import { App } from './components/app';
import { finalize } from './finalize';
import { initialize } from './initialize';
import { Transport } from '../communicator';

initialize().then((res) => {
    const [transport, config] = res;
    const app = document.getElementById('app');
    const store = configureStore({config});
    store.subscribe(() => {
        const state = store.getState();
        if (state.result) {
            finalize(state, transport as Transport, app);
        }
    });
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        app
    );
});
