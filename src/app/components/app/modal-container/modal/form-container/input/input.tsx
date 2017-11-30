import * as React from 'react';
import * as styles from './input.scss';
import * as cx from 'classnames';
import { IconType, Icon } from 'checkout/components/ui';

interface InputProps {
    icon?: IconType;
    placeholder?: string;
    mark?: boolean;
    className?: string;
    formatter?: (element: Element) => void;
    type?: 'password';
}

export const Input: React.SFC<InputProps> = (props) => (
    <div className={cx(styles.container, props.className, {[styles._correct]: true})}>
        {props.icon ? <Icon className={styles.icon} icon={props.icon}/> : false}
        <input
            className={cx(styles.input, {[styles.mark]: props.mark})}
            placeholder={props.placeholder}
            ref={(input) => props.formatter ? props.formatter(input) : false}
            type={props.type}
        />
        {props.mark ? <Icon className={styles.checkmark} icon={IconType.cross}/> : false}
    </div>
);
