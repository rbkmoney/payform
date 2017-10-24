import * as React from 'react';
import * as styles from './styles.scss';

import { Header, Info, Footer } from '../index';

export class Container extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                <Header />
                <Info />
                <Footer />
            </div>
        );
    }
}
