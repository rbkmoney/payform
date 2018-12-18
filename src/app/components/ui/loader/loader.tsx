import * as React from 'react';
import * as cx from 'classnames';

import { withTheme } from 'checkout/styled-components';
import * as styles from './loader.scss';
import { themes, WithThemeProps } from 'checkout/themes';

const LoaderDef: React.FC<WithThemeProps> = ({ theme }) => (
    <svg className={cx(styles.loader)} width="57px" height="57px" viewBox="0 0 57 57">
        <defs>
            <linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id={themes.coral.name}>
                <stop stopColor="#7854CD" offset="0%" />
                <stop stopColor="#FF8353" offset="100%" />
            </linearGradient>
            <linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id={themes.main.name}>
                <stop stopColor="#8330EC" offset="0%" />
                <stop stopColor="#5A46F9" offset="38%" />
                <stop stopColor="#38CD8F" offset="100%" />
            </linearGradient>
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-655.000000, -383.000000)" strokeWidth="4" stroke={`url(#${theme.name})`}>
                <circle cx="683.5" cy="411.5" r="26.5" />
            </g>
        </g>
    </svg>
);

export const Loader = withTheme(LoaderDef);
