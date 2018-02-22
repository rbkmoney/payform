import * as React from 'react';
import * as styles from '../../payment-methods.scss';

export const WalletsIcon: React.SFC = () => (
    <div className={styles.icon}>
        {/* tslint:disable:max-line-length */}
        <svg width='40' height='40' version='1.1'>
            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <path fill='#FFF' d='M0 0h40v40H0z'/>
                <g strokeWidth='1'>
                    <path d='M35 17.565v14.15C35 32.979 33.99 34 32.743 34H8.257C7.01 34 6 32.978 6 31.716V8.139'
                          fill='#FFF'/>
                    <path d='M35 17.565v14.15C35 32.979 33.99 34 32.743 34H7.257C6.01 34 5 32.978 5 31.716V8.139'
                          stroke='#07F' strokeWidth='2'/>
                    <path
                        d='M35 18v-2.422C35 13.602 33.451 12 32.68 12H8.424C6.024 12 5 10.942 5 9.636V8.364C5 7.058 6.023 6 7.285 6h19.546c1.937 0 3.508 1.625 3.508 3.629V12'
                        stroke='#07F' strokeWidth='2'/>
                    <path fill='#FFF' d='M12.567 26.875L20.5 19v9l7.933-7.875'/>
                    <path stroke='#07F' d='M12.567 26.875L20.5 19v9l7.933-7.875'/>
                </g>
            </g>
        </svg>
        {/* tslint:enable:max-line-length */}
    </div>
);
