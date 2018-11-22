import * as React from 'react';

import styled from 'checkout/styled-components';

export const Link = styled.a`
    font-weight: 900;
    font-size: 11px;
    color: ${({ theme }) => theme.color.secondary[0.9]};
    letter-spacing: 2px;
    line-height: 15px;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    :hover,
    :active {
        color: ${({ theme }) => theme.color.secondary[0.8]};
    }
`;
