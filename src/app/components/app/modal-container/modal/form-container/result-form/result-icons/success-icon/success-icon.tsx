import * as React from 'react';

import Success from './success-icon.svg';
import NeutralSuccess from './neutral-success-icon.svg';
import styled, { withTheme } from 'checkout/styled-components';
import { themes, WithThemeProps } from 'checkout/themes';

export const SuccessIcon = styled(
    withTheme(({ theme, ...props }: WithThemeProps) => {
        const Icon = theme.name === themes.main.name ? Success : NeutralSuccess;
        return <Icon {...props} id="success-icon" />;
    })
)`
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
`;
