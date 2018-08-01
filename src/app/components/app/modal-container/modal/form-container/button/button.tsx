import * as React from 'react';
import { MouseEventHandler } from 'react';
import * as styles from './button.scss';
import * as cx from 'classnames';

type ButtonType = 'primary' | 'default' | 'secondary';

export interface ButtonProps {
    style: ButtonType;
    type?: 'submit';
    children: React.ReactNode;
    className?: string;
    id?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const getClass = (type: ButtonType) => {
    switch (type) {
        case 'primary':
            return styles._primary;
        case 'secondary':
            return styles._secondary;
        default:
            return '';
    }
};

export const Button: React.SFC<ButtonProps> = (props) => (
    <button
        type={props.type}
        onClick={props.onClick}
        className={cx(styles.button, getClass(props.style), props.className)}
        id={props.id}>
        {props.style === 'secondary' ? (
            <span>
                {props.children}
                <hr className={styles.line} />
            </span>
        ) : (
            props.children
        )}
    </button>
);
