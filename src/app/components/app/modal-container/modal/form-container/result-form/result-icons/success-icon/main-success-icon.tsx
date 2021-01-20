import * as React from 'react';

import SmileIcon from './smile-icon.svg';
import styled from 'checkout/styled-components';

const MainSuccess = styled.svg`
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
`;

export const MainSuccessIcon = () => (
    <MainSuccess viewBox="0 0 86 86" id="success-icon">
        <SmileIcon />
    </MainSuccess>
);
