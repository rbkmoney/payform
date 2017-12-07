import * as React from 'react';
import * as styles from './input.scss';
import * as cx from 'classnames';
import { IconType, Icon } from 'checkout/components/ui';
import { ChangeEvent } from 'react';

interface InputProps {
    icon?: IconType;
    placeholder?: string;
    mark?: boolean;
    className?: string;
    formatter?: (e: Element) => void;
    type?: 'password';
    currentValue?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
}

export const Input: React.SFC<InputProps> = (props) => (
    <div className={cx(styles.container, props.className, {
        [styles._correct]: true,
        [styles._hasError]: props.error
    })}>
        {props.icon ? <Icon className={styles.icon} icon={props.icon}/> : false}
        <input
            onChange={props.onChange}
            className={cx(styles.input, {[styles.mark]: props.mark})}
            placeholder={props.placeholder}
            ref={(input) => input && props.formatter ? props.formatter(input) : false}
            type={props.type}
            value={props.currentValue}
        />
        {props.mark ? <Icon className={styles.checkmark} icon={IconType.cross}/> : false}
    </div>
);
