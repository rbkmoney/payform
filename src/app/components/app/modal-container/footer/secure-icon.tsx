import * as React from 'react';
import { StylizedSvgIcon } from './stylized-svg-icon';

export const SecureIcon: React.SFC<StylizedSvgIcon> = (props) => (
    <svg className={props.className} width='8' height='11'>
        <g fill='none' fillRule='evenodd'>
            <path d='M1 4.5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5h-.5V3C6.5 1.6195 5.3807.5003 4 .5003 2.6195.5002 1.5003 1.6194 1.5003 3V4.5H1z'/>
            <rect fillRule='evenodd' x='1' y='4' width='6' height='6'/>
        </g>
    </svg>
);
