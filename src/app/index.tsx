import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/main.scss';
import './styles/forms.scss';
import { configureStore } from './configure-store';
import { App } from './components/app';
import { finalize } from './finalize';

const store = configureStore();
const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);

store.subscribe(() => {
    const state = store.getState();
    if (state.result) {
        finalize(state, app);
    }
});
