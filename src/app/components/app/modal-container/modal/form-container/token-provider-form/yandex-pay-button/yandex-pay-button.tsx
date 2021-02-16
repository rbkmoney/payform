import * as React from 'react';

import styled from 'checkout/styled-components';
import YandexPayIcon from './yandex-pay-icon.svg';

const YandexPayButtonWrapper = styled.button`
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
    padding: 12px 24px;
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

export const YandexPayButton: React.FC<React.ComponentProps<typeof YandexPayButtonWrapper>> = (props) => (
    <YandexPayButtonWrapper {...props} type="button" id="yandex-pay-button">
        <YandexPayIcon />
    </YandexPayButtonWrapper>
);
