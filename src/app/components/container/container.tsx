import * as React from 'react';
import * as styles from './container.scss';

import {Header, Info, Footer, Form, ThreeDSContainer, ContainerLoader, Close} from '../index';

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
            <div className={styles.main_container}>
                {Container.getView() !== 'loading' ?
                    <div className={styles.container}>
                        <Close />
                        {Container.getView() === 'default' ?
                            <div className={styles.form_container}>
                                <Header/>
                                <Info/>
                                <Form/>
                                <Footer/>
                            </div>
                            : false}
                        {Container.getView() === '3ds' ? <ThreeDSContainer/> : false}
                    </div>
                    : <ContainerLoader/> }
                    {Container.getView() !== 'loading' && Container.getView() !== '3ds' ? <Footer/> : false}
            </div>

        );
    }
}
