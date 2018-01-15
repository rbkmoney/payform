import * as React from 'react';
import * as styles from './form-loader.scss';
import { Loader } from 'checkout/components';

export const FormLoader: React.SFC = () => (
    <div className={styles.loader} id='form-loader'>
        <Loader/>
    </div>
);
