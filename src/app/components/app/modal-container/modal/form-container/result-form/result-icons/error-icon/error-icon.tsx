import * as React from 'react';

import styled from 'checkout/styled-components';
import { growth } from 'checkout/styled-components/animations';
import Icon from './error-icon.svg';

export const ErrorIcon = styled((props) => <Icon {...props} id="error-icon" />)`
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;

    g circle {
        // fill: ${({ theme }) => theme.color.primary[1]};
    }

    g path {
        transform-origin: 30% 0%;
        animation: ${growth} 0.5s linear 0.2s forwards;
    }
`;
