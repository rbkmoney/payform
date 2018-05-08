import * as React from 'react';
import { icon } from '../methods.scss';

export const BankCardIcon: React.SFC = () => (
    <div className={icon}>
        {/* tslint:disable:max-line-length */}
        <svg width='40' height='40'>
            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <path fill='#FFF' d='M0 0h40v40H0z'/>
                <path
                    d='M29.994 25H5.007C3.899 25 3 24.071 3 22.925V9.075C3 7.929 3.899 7 5.007 7h24.987C31.102 7 32 7.929 32 9.075v13.85C32 24.071 31.102 25 29.994 25z'
                    stroke='#07F' strokeWidth='2' fill='#FFF'/>
                <path
                    d='M34.994 34H10.007C8.899 34 8 33.071 8 31.925v-13.85C8 16.929 8.899 16 10.007 16h24.987c1.108 0 2.006.929 2.006 2.075v13.85C37 33.071 36.102 34 34.994 34z'
                    stroke='#07F' strokeWidth='2' fill='#FFF'/>
                <path fill='#07F' d='M4 13h27v-1H4zm7 15h16v-1H11zm19 0h4v-1h-4z'/>
            </g>
        </svg>
        {/* tslint:enable:max-line-length */}
    </div>
);
