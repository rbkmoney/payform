import * as React from 'react';

import styled from 'checkout/styled-components';
import SamsungPayIcon from './samsung-pay-icon.svg';

const SamsungPayButtonWrapper = styled.button`
    cursor: pointer;
    background-color: #000;
    background-origin: content-box;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 1px 1px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
    outline: 0;
    padding: 11px 24px;
    width: 100%;
    height: 48px;
    margin-top: 20px;
    transition: background-color 0.15s linear;

    &:hover {
        background-color: #3c4043;
    }
    &:focus {
        box-shadow: #202124;
    }
    &:active {
        background-color: #5f6368;
    }

    svg {
        max-height: 100%;
    }
`;

export const SamsungPayButton: React.FC<React.ComponentProps<typeof SamsungPayButtonWrapper>> = (props) => (
    <SamsungPayButtonWrapper {...props} type="button" id="samsung-pay-button">
        <SamsungPayIcon />
    </SamsungPayButtonWrapper>
);
