import * as React from 'react';
import * as styles from './success-icon.scss';

export const SuccessIcon: React.SFC = () => (
    <svg className={styles.success} viewBox="0 0 86 86" id="success-icon">
        <defs>
            <path
                d="M46 23C46 10.536 36.086.388 23.714.01 23.477.005 23.239 0 23 0 10.297 0 0 10.297 0 23"
                id="semicircle"
            />
            <mask id="semicircle2" fill="#fff">
                <use xlinkHref="#semicircle" />
            </mask>
            <mask id="semicircle3" fill="#fff">
                <use transform="rotate(180 23 11.5)" xlinkHref="#semicircle" />
            </mask>
        </defs>
        <g fill="none" fillRule="evenodd">
            <circle fill="#38CD8F" fillRule="nonzero" cx="43" cy="43" r="43" />
            <g fillRule="nonzero" stroke="#000" strokeLinecap="round" strokeWidth="2">
                <path d="M65.093 35c0-3.314-2.707-6-6.046-6C55.707 29 53 31.686 53 35M33.093 35c0-3.314-2.707-6-6.046-6C23.707 29 21 31.686 21 35" />
            </g>
            <g transform="translate(20 48)">
                <use fill="#000" fillRule="nonzero" transform="rotate(180 23 11.5)" xlinkHref="#semicircle" />
                <ellipse
                    fill="#E75542"
                    fillRule="nonzero"
                    mask="url(#semicircle3)"
                    cx="23"
                    cy="23.5"
                    rx="14"
                    ry="8.5"
                />
            </g>
        </g>
    </svg>
);
