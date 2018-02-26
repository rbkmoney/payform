import * as React from 'react';
import * as styles from './loader.scss';
import * as cx from 'classnames';

const LoaderDef = () => (
    <svg className={cx(styles.loader)} width='57px' height='57px' viewBox='0 0 57 57'>
        <defs>
            <linearGradient x1='81.0546875%' y1='14.7277462%' x2='0%' y2='112.362939%' id='linearGradient'>
                <stop stopColor='#01CAFF' offset='0%'/>
                <stop stopColor='#6D00C9' offset='100%'/>
            </linearGradient>
        </defs>
        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <g transform='translate(-655.000000, -383.000000)' strokeWidth='4' stroke='url(#linearGradient)'>
                <circle cx='683.5' cy='411.5' r='26.5'/>
            </g>
        </g>
    </svg>
);

export const Loader = LoaderDef;
