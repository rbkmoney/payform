import * as React from 'react';

import { withTheme } from 'checkout/styled-components';
import { ThemeName, WithThemeProps } from 'checkout/themes';
import { NeutralSuccessIcon } from './neutral-success-icon';
import { MainSuccessIcon } from './main-success-icon';

export const SuccessIcon = withTheme(({ theme }: WithThemeProps) => {
    switch (theme.name) {
        case ThemeName.main:
            return <MainSuccessIcon />;
        default:
            return <NeutralSuccessIcon />;
    }
});
