import * as React from 'react';
import {icon} from '../methods.scss';

export const TerminalsIcon: React.SFC = () => (
    <div className={icon}>
        {/* tslint:disable:max-line-length */}
        <svg width='40' height='40' viewBox='0 0 32 22' xmlns='http://www.w3.org/2000/svg'>
            <g fill='none' fillRule='evenodd'>
                <path d='M29 0H3C1.35 0 0 1.35 0 3v14c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3z'
                      fill='#685BFF'/>
                <path d='M16.5 6a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9' fill='#FFF'/>
                <path stroke='#FFF' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'
                      d='M6 3H3v3M26 17h3v-3M3 14v3h3M29 6V3h-3'/>
            </g>
        </svg>
        {/* tslint:enable:max-line-length */}
    </div>
);
