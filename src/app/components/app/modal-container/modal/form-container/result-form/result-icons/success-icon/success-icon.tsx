import * as React from 'react';
import * as styles from './success-icon.scss';

export const SuccessIcon: React.SFC = () => (
    <svg className={styles.success} viewBox="0 0 86 86" id="success-icon">
        <g fillRule="nonzero" fill="none">
            <circle fill="#FFF" cx="43" cy="43" r="43" />
            <path
                stroke="#FFF"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M27 42.862L39.089 55 61 33"
            />
        </g>
    </svg>
);
