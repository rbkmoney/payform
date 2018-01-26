import * as React from 'react';
import * as styles from '../../payment-methods.scss';

export const WalletsIcon: React.SFC = () => (
    <div className={styles.icon}>
        {/* tslint:disable:max-line-length */}
        <svg width='40px' height='40px' viewBox='0 0 40 40' version='1.1'>
            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g transform='translate(-700.000000, -384.000000)'>
                    <g transform='translate(675.000000, 170.000000)'>
                        <g transform='translate(0.000000, 194.000000)'>
                            <g transform='translate(25.000000, 20.000000)'>
                                <rect fill='#FFFFFF' x='0' y='0' width='40' height='40'/>
                                <g strokeWidth='1' transform='translate(5.000000, 6.000000)'>
                                    <g transform='translate(0.000000, 2.000000)'>
                                        <g transform='translate(1.000000, 0.000000)' fill='#FFFFFF'>
                                            <path
                                                d='M29,9.56521739 L29,23.7155652 C29,24.9775217 27.98964,26 26.74264,26 L2.25736,26 C1.01036,26 0,24.9775217 0,23.7155652 L0,0.138695652'
                                                id='Fill-1'/>
                                        </g>
                                        <path
                                            d='M30,9.56521739 L30,23.7155652 C30,24.9775217 28.98964,26 27.74264,26 L2.25736,26 C1.01036,26 0,24.9775217 0,23.7155652 L0,0.138695652'
                                            id='Stroke-3' stroke='#0077FF' strokeWidth='2'/>
                                    </g>
                                    <path
                                        d='M30,12 L30,9.5784 C30,7.602 28.4514,6 27.68,6 L3.42432,6 C1.02312,6 0,4.9416 0,3.636 L0,2.364 C0,1.0584 1.02312,0 2.2852,0 L21.83128,0 C23.76848,0 25.33912,1.6248 25.33912,3.6288 L25.33912,6'
                                        id='Stroke-5' stroke='#0077FF' strokeWidth='2'/>
                                    <g transform='translate(7.000000, 13.000000)'>
                                        <polyline fill='#FFFFFF'
                                                  points='0.566666667 7.875 8.5 0 8.5 9 16.4333333 1.125'/>
                                        <polyline stroke='#0077FF'
                                                  points='0.566666667 7.875 8.5 0 8.5 9 16.4333333 1.125'/>
                                    </g>
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
