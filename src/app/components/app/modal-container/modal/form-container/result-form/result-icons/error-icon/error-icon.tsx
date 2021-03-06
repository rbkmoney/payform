import * as React from 'react';

import styled, { css, withTheme } from 'checkout/styled-components';
import { growth } from 'checkout/styled-components/animations';
import Error from './error-icon.svg';
import NeutralError from './neutral-error-icon.svg';
import { Theme, ThemeName } from 'checkout/themes';

export const ErrorIcon = styled(
    withTheme(({ theme, ...props }: { theme: Theme }) => {
        const Icon = theme.name === ThemeName.main ? Error : NeutralError;
        return <Icon {...props} id="error-icon" />;
    })
)`
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;

    ${({ theme }) =>
        theme.name === ThemeName.main &&
        css`
            g path {
                transform-origin: 30% 0%;
                animation: ${growth} 0.5s linear 0.2s forwards;
            }
        `}
`;
