import * as React from 'react';
import * as styles from '../payment-methods.scss';

interface BankCardProps {
    onClick?: () => {};
}

export const BankCard: React.SFC<BankCardProps> = (props) => (
    <li className={styles.method} {...props}>
        <div className={styles.icon}>
            {/* tslint:disable:max-line-length */}
            <svg width='40px' height='40px' viewBox='0 0 40 40'>
                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                    <g transform='translate(-45.000000, -366.000000)'>
                        <g transform='translate(5.000000, 276.000000)'>
                            <g transform='translate(20.000000, 70.000000)'>
                                <g transform='translate(20.000000, 20.000000)'>
                                    <rect fill='#FFFFFF' x='0' y='0' width='40' height='40'/>
                                    <path
                                        d='M29.99436,25 L5.0068,25 C3.899,25 3,24.0712 3,22.9252 L3,9.0748 C3,7.9288 3.899,7 5.0068,7 L29.99436,7 C31.10216,7 32,7.9288 32,9.0748 L32,22.9252 C32,24.0712 31.10216,25 29.99436,25 Z'
                                        stroke='#0077FF' strokeWidth='2' fill='#FFFFFF'/>
                                    <path
                                        d='M34.99436,34 L10.0068,34 C8.899,34 8,33.0712 8,31.9252 L8,18.0748 C8,16.9288 8.899,16 10.0068,16 L34.99436,16 C36.10216,16 37,16.9288 37,18.0748 L37,31.9252 C37,33.0712 36.10216,34 34.99436,34 Z'
                                        stroke='#0077FF' strokeWidth='2' fill='#FFFFFF'/>
                                    <polygon fill='#0077FF' points='4 13 31 13 31 12 4 12'/>
                                    <polygon fill='#0077FF' points='11 28 27 28 27 27 11 27'/>
                                    <polygon fill='#0077FF' points='30 28 34 28 34 27 30 27'/>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            {/* tslint:enable:max-line-length */}
        </div>
        <div className={styles.title}>
            Банковская карта
            <hr/>
        </div>
    </li>
);
