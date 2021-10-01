import * as React from 'react';

import styled from 'checkout/styled-components';

const NeutralSuccess = styled.svg`
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
    circle {
        fill: ${({ theme }) => theme.color.success[1]};
    }
    path {
        stroke: #fff;
        stroke-width: 5;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
`;

export const NeutralSuccessIcon = () => (
    <NeutralSuccess viewBox="0 0 86 86" id="success-icon">
        <g fillRule="nonzero" fill="none">
            <circle cx="43" cy="43" r="43" />
            <path d="M27 42.862L39.089 55 61 33" />
        </g>
    </NeutralSuccess>
);
