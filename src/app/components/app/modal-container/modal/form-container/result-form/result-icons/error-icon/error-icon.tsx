import * as React from 'react';
import * as styles from './error-icon.scss';

export const ErrorIcon: React.SFC = () => (
    <svg className={styles.error} viewBox="0 0 86 86">
        <defs>
            <path
                d="M13 16c7.18 0 13-2.327 13-6.333C26 5.662 20.18 0 13 0S0 5.662 0 9.667C0 13.673 5.82 16 13 16z"
                id="a"
            />
        </defs>
        <g fill="none" fillRule="evenodd">
            <circle fill="#38CD8F" fillRule="nonzero" cx="43" cy="43" r="43" />
            <g transform="translate(24 30)" fill="#000" fillRule="nonzero">
                <ellipse cx="4.535" cy="4.5" rx="4.535" ry="4.5" />
                <ellipse cx="34.465" cy="4.5" rx="4.535" ry="4.5" />
            </g>
            <g transform="translate(30 53)">
                <mask id="b" fill="#fff">
                    <use xlinkHref="#a" />
                </mask>
                <use fill="#000" fillRule="nonzero" xlinkHref="#a" />
                <ellipse fill="#E75542" fillRule="nonzero" mask="url(#b)" cx="13" cy="17" rx="18" ry="8" />
            </g>
            <path
                d="M19.061 19.43c-1.62-3.221-2.612-3.343-3.239-6.443-2.428 1.897-4.458 3.483-4.945 7.453-.554 4.513 3.556 6.811 6.338 5.816 2.114-.756 3.348-3.838 1.846-6.826z"
                fill="#FFF"
                fillRule="nonzero"
                className={styles.sweat}
            />
        </g>
    </svg>
);
