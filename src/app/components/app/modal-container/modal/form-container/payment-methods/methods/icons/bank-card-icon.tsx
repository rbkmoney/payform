import * as React from 'react';
import { icon } from '../methods.scss';

export const BankCardIcon: React.SFC = () => (
    <div className={icon}>
        {/* tslint:disable:max-line-length */}
        <svg width="40" height="40" viewBox="0 0 32 22" xmlns="http://www.w3.org/2000/svg">
            <g fill="#685BFF" fillRule="evenodd">
                <path d="M32 6V3c0-1.65-1.35-3-3-3H3C1.35 0 0 1.35 0 3v3h32zM0 8v11c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3V8H0z" />
            </g>
        </svg>
        {/* tslint:enable:max-line-length */}
    </div>
);
