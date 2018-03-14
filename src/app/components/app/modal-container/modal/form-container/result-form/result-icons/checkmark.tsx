import * as React from 'react';
import * as styles from './checkmark.scss';

export const Checkmark: React.SFC = () => (
    <svg id='checkmark-icon' className={styles.checkmark} viewBox='0 0 52 52'>
        <circle cx='26' cy='26' r='25' fill='none'/>
        <path fill='none' d='M14.1 27.2l7.1 7.2 16.7-16.8'/>
    </svg>
);
