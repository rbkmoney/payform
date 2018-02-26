import * as React from 'react';
import * as styles from './warning.scss';

export const Warning: React.SFC = () => (
    <svg viewBox='0 0 50 50' className={styles.warning}>
        <g fill='none'>
            <circle cx='25' cy='25' r='25'/>
            <path d='M28.42 35.54c0 1.9-1.52 3.46-3.46 3.46a3.45 3.45 0 0 1-3.46-3.46c0-1.9 1.52-3.46 3.46-3.46a3.45 3.45 0 0 1 3.46 3.46zm-1.87-6.92h-3.21a.89.89 0 0 1-.89-.85l-.68-14.84a.89.89 0 0 1 .89-.93h4.6c.5 0 .91.42.89.93l-.71 14.84a.89.89 0 0 1-.9.85z'/>
        </g>
    </svg>
);
