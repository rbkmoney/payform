import * as React from 'react';
import * as styles from './form-loader.scss';
import {Loader} from '../../../index';

export class FormLoader extends React.Component {
    render() {
        return (
            <div className={styles.loader}>
                <Loader/>
            </div>
        );
    }
}
