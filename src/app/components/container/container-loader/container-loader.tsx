import * as React from 'react';
import {Loader} from '../../index';
import * as styles from './container-loader.scss';

export class ContainerLoader extends React.Component {

    render() {
        return (
            <div className={styles.loader}>
                <Loader/>
            </div>
        );
    }
}
