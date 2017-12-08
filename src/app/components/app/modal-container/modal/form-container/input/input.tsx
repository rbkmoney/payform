import * as React from 'react';
import { WrappedFieldInputProps } from 'redux-form';
import * as styles from './input.scss';
import * as cx from 'classnames';
import { Icon, IconType } from 'checkout/components/ui';

interface CustomProps {
    icon?: IconType;
    placeholder?: string;
    mark?: boolean;
    className?: string;
    formatter?: (e: Element) => void;
    type?: 'password';
    error?: boolean;
}

type InputProps = WrappedFieldInputProps & CustomProps;

export const Input: React.SFC<InputProps & WrappedFieldInputProps> = (props) => {
    return (<div className={cx(styles.container, props.className, {
            [styles._correct]: !props.error && !!props.value,
            [styles._hasError]: props.error
        })}>
            {props.icon ? <Icon className={styles.icon} icon={props.icon}/> : false}
            <input
                onChange={props.onChange}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                onDrop={props.onDrop}
                onDragStart={props.onDragStart}
                className={cx(styles.input, {[styles.mark]: props.mark})}
                placeholder={props.placeholder}
                ref={(input) => input && props.formatter ? props.formatter(input) : false}
                type={props.type}
                value={props.value}
            />
            {props.mark ? <Icon className={styles.checkmark} icon={IconType.checkmark}/> : false}
        </div>
    );
};
