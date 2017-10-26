import * as React from 'react';
import * as styles from './container.scss';

import { Header, Info, Footer, Form } from '../index';

export class Container extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                <Header />
                <Info />
                <Form />
                <Footer />
            </div>
        );
    }
}
