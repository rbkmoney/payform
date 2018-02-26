import * as React from 'react';
import * as styles from '../../payment-methods.scss';

export const TerminalsIcon: React.SFC = () => (
    <div className={styles.icon}>
        {/* tslint:disable:max-line-length */}
        <svg width='40' height='40'>
            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <path fill='#FFF' d='M0 0h40v40H0z'/>
                <path d='M32 36H8V5.367A2.364 2.364 0 0 1 10.36 3h19.28C30.942 3 32 4.06 32 5.367V36z' stroke='#07F'
                      strokeWidth='2' fill='#FFF'/>
                <path d='M11 19h18V6H11v13zm1-1h16V7H12v11zm-4 4h24v-1H8zm15 5h6v-1h-6z' fill='#07F'/>
            </g>
        </svg>
        {/* tslint:enable:max-line-length */}
    </div>
);
