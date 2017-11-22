import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container } from './components';
import './styles/main.scss';
import './styles/forms.scss';
import { ConfigResolver } from './config/config-resolver';
import { Child } from '../communication-ts/child';

Child.resolve()
    .then((transport) =>
        Promise.all([
            transport,
            ConfigResolver.resolve(transport)
        ]))
    .then((res) => {
        console.info(res);
        ReactDOM.render(
            <Container/>,
            document.getElementById('app')
        );
    })
    .catch((error) => {
        // TODO handle error
        console.error(error);
    });
