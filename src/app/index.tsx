import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/main.scss';
import './styles/forms.scss';
import { configureStore } from './configure-store';
import { App } from './components/app';

ReactDOM.render(
    <Provider store={configureStore()}>
        <App/>
    </Provider>,
    document.getElementById('app')
);
