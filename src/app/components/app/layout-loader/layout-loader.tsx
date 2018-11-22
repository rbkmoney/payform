import * as React from 'react';
import * as styles from './layout-loader.scss';
import { Loader } from '../../ui/loader';

const LayoutLoaderDef: React.FC = () => (
    <div className={styles.loader}>
        <Loader />
    </div>
);

export const LayoutLoader = LayoutLoaderDef;
