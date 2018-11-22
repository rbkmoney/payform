import * as React from 'react';
import { Icon } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/icon';

export const TerminalsIcon: React.SFC = () => (
    <Icon>
        <svg width="40" height="40" viewBox="0 0 32 22" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path
                    fill="#685BFF"
                    transform="translate(-4, -9)"
                    d="M33.05,10h-26a3,3,0,0,0-3,3V27a3,3,0,0,0,3,3h26a3,3,0,0,0,3-3V13A3,3,0,0,0,33.05,10Zm-23,18h-3a1,1,0,0,1-1-1V24a1,1,0,0,1,2,0v2h2a1,1,0,0,1,0,2Zm0-14h-2v2a1,1,0,0,1-2,0V13a1,1,0,0,1,1-1h3a1,1,0,0,1,0,2Zm10.5,11a4.5,4.5,0,1,1,4.5-4.5A4.5,4.5,0,0,1,20.55,25Zm13.5,2a1,1,0,0,1-1,1h-3a1,1,0,1,1,0-2h2V24a1,1,0,0,1,2,0Zm0-11a1,1,0,0,1-2,0V14h-2a1,1,0,1,1,0-2h3a1,1,0,0,1,1,1Z"
                />
            </g>
        </svg>
    </Icon>
);
