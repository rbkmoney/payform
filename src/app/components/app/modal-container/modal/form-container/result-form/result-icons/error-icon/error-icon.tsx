import * as React from 'react';
import * as styles from './error-icon.scss';

export const ErrorIcon: React.SFC = () => (
    <svg id="error-icon" className={styles.error} viewBox="0 0 50 50">
        <circle cx="26" cy="26" r="25" fill="none" />
        <path d="M36 36.85L13.5 13M14 37l22-24" />
    </svg>
);
