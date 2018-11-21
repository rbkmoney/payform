import * as React from 'react';

import { keyframes } from 'checkout/styled-components';
import styled from 'checkout/styled-components';
import Theme from 'checkout/themes/theme';

const fillYellow = ({ theme }: { theme: Theme }) => keyframes`
    100% {
        box-shadow: inset 0 0 0 30px ${theme.color.warning[1]};
    }
`;

const Warning = styled.svg`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: block;
    stroke-width: 4;
    stroke: #fff;
    stroke-miterlimit: 10;
    margin: auto;
    box-shadow: inset 0 0 0 ${({ theme }) => theme.color.warning[1]};
    animation: ${fillYellow} 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.6s both;

    circle {
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-width: 0;
        stroke-miterlimit: 10;
        stroke: ${({ theme }) => theme.color.warning[1]};
        fill: ${({ theme }) => theme.color.warning[1]};
    }

    path {
        fill: #fff;
        transform-origin: 50% 50%;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
    }
`;

export const WarningIcon: React.SFC = () => (
    <Warning viewBox="0 0 50 50" id="warning-icon">
        <g fill="none">
            <circle cx="25" cy="25" r="25" />
            <path d="M28.42 35.54c0 1.9-1.52 3.46-3.46 3.46a3.45 3.45 0 0 1-3.46-3.46c0-1.9 1.52-3.46 3.46-3.46a3.45 3.45 0 0 1 3.46 3.46zm-1.87-6.92h-3.21a.89.89 0 0 1-.89-.85l-.68-14.84a.89.89 0 0 1 .89-.93h4.6c.5 0 .91.42.89.93l-.71 14.84a.89.89 0 0 1-.9.85z" />
        </g>
    </Warning>
);
