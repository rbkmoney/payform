import * as React from 'react';
import * as styles from './container.scss';

import {Header, Info, Footer, Form, ThreeDSContainer, ContainerLoader} from '../index';

export class Container extends React.Component {
    static getView(): string {
        switch (window.location.search) {
            case '?view=loading':
                return 'loading';
            case '?view=3ds':
                return '3ds';
            case '?view=default':
            default:
                return 'default';
        }
    }

    render() {
        return (
            <div className={styles.container}>
                {Container.getView() !== 'loading' ?
                    <div className={styles.form_container}>
                        {Container.getView() === 'default' ? <Header/> : false} {Container.getView() === 'default' ?
                        <Info/> : false} {Container.getView() === 'default' ?
                        <Form/> : false} {Container.getView() === 'default' ?
                        <Footer/> : false} {Container.getView() === '3ds' ? <ThreeDSContainer/> : false}
                    </div>
                    : <ContainerLoader/> }
                    {Container.getView() !== 'loading' ? <Footer/> : false}
            </div>

        );
    }
}
