import * as React from 'react';
import * as styles from './cross.scss';

export const Cross: React.SFC = () => (
    <svg className={styles.cross} viewBox='0 0 50 50' version='1.1' id='cross'>
        <circle cx='26' cy='26' r='25' fill='none'/>
        <path d='M36,36.8502994 L13.5,13' strokeLinecap='square'/>
        <path d='M14,37 L36,13' strokeLinecap='square'/>
    </svg>
);
