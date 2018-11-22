import * as React from 'react';
import { Icon } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/icon';

export const SamsungPayIcon: React.SFC = () => (
    <Icon>
        <svg viewBox="0 0 32 32">
            <defs>
                <linearGradient id="a" x1="16" y1=".07" x2="16" y2="30.97" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#685BFF" />
                    <stop offset="1" stopColor="#685BFF" />
                </linearGradient>
            </defs>
            <g>
                <path
                    d="M31.37 9.53c-.86-3.6-2.81-6.51-6.25-8S17.37-.15 13.58.11c-3 .2-6.15.73-8.68 2.5C1.73 4.82.63 8.72.23 12.38c-.69 6.39-.18 15 6.45 18C10.16 32 14.23 32.12 18 31.92s7.54-.81 10.3-3.45c2.42-2.32 3.29-5.93 3.55-9.17a31.71 31.71 0 0 0-.48-9.77zM9.3 19.67a7.2 7.2 0 0 1-1 0c-.1 0-.14 0-.14-.13v-1.09c0-.13.06-.14.17-.14a6.9 6.9 0 0 0 1-.07 2.11 2.11 0 0 0 1.67-2.3 2.2 2.2 0 0 0-2.05-2H6.78a.21.21 0 0 0-.24.23v7.66H5.26a.15.15 0 0 1-.15-.15v-7.43a1.66 1.66 0 0 1 1.75-1.77h1.93a3.82 3.82 0 0 1 3.64 3.43 3.53 3.53 0 0 1-3.13 3.76zm10.9.07h-1a.22.22 0 0 1-.21-.21v-3.31a2.3 2.3 0 0 0-4.51-.63 2.05 2.05 0 0 0 1.71 2.65 5.64 5.64 0 0 0 .82.05c.06 0 .16.05.16.21v1.19a3.63 3.63 0 0 1-4.13-2.77 3.76 3.76 0 0 1 3-4.38 3.75 3.75 0 0 1 4.37 3.68v3.27a.22.22 0 0 1-.21.25zm1.86-7a.19.19 0 0 1 .19.12L24 16.41a.2.2 0 0 1 0 .15c-.23.48-.47 1-.71 1.44l-.05.08-2.59-5.35zM24 21.86a.29.29 0 0 1-.32.19h-1.4l4.47-9.15a.26.26 0 0 1 .28-.17h1.39s-3.01 6.16-4.42 9.13z"
                    fill="url(#a)"
                />
            </g>
        </svg>
    </Icon>
);
