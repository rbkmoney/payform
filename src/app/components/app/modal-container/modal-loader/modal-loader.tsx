import * as React from 'react';
import * as styles from './modal-loader.scss';
import { Loader } from 'checkout/components';

export const ModalLoader: React.SFC = () => (
    <div className={styles.loader}>
        <Loader/>
    </div>
);
