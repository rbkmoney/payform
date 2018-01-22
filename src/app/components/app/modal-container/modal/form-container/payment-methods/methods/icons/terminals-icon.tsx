import * as React from 'react';
import * as styles from '../../payment-methods.scss';

export const TerminalsIcon: React.SFC = () => (
    <div className={styles.icon}>
        {/* tslint:disable:max-line-length */}
        <svg width='40px' height='40px' viewBox='0 0 40 40'>
            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g transform='translate(-45.000000, -456.000000)'>
                    <g transform='translate(5.000000, 276.000000)'>
                        <g transform='translate(20.000000, 160.000000)'>
                            <g transform='translate(20.000000, 20.000000)'>
                                <rect fill='#FFFFFF' x='0' y='0' width='40' height='40'/>
                                <g transform='translate(8.000000, 3.000000)'>
                                    <path
                                        d='M24,33 L0,33 L0,2.3674 C0,1.0602 1.05726316,0 2.36084211,0 L21.6391579,0 C22.9427368,0 24,1.0602 24,2.3674 L24,33 Z'
                                        stroke='#0077FF' strokeWidth='2' fill='#FFFFFF'/>
                                    <path d='M3,16 L21,16 L21,3 L3,3 L3,16 Z M4,15 L20,15 L20,4 L4,4 L4,15 Z'
                                          fill='#0077FF'/>
                                    <polygon fill='#0077FF' points='0 19 24 19 24 18 0 18'/>
                                    <polygon fill='#0077FF' points='15 24 21 24 21 23 15 23'/>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        {/* tslint:enable:max-line-length */}
    </div>
);
