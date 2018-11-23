import * as React from 'react';

import Success from './success-icon.svg';
import styled from 'checkout/styled-components';

export const SuccessIcon = styled(Success).attrs({ id: 'success-icon' })`
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
`;
