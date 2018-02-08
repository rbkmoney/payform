import * as React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import * as styles from './input.scss';
import * as cx from 'classnames';
import { Icon, IconType } from 'checkout/components/ui';
import { Marks } from './marks';

export interface CustomProps {
    icon?: IconType;
    placeholder?: string;
    mark?: boolean; // TODO mark always true
    className?: string;
    type?: 'text' | 'number' | 'value' | 'tel' | 'email';
    id?: string;
    onInput?: React.FormEventHandler<HTMLInputElement>;
}

type InputProps = WrappedFieldInputProps & WrappedFieldMetaProps & CustomProps;

export const Input: React.SFC<InputProps> = (props) => (
    <div className={cx(styles.container, props.className, {
        [styles._hasError]: props.error
    })}>
        {props.icon ? <Icon className={styles.icon} icon={props.icon}/> : false}
        <input
            onChange={props.onChange}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            onDrop={props.onDrop}
            onDragStart={props.onDragStart}
            onInput={props.onInput}
            className={cx(styles.input, {[styles.mark]: props.mark})}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            id={props.id}
        />
        {props.mark ? <Marks active={props.active} pristine={props.pristine} error={props.error}/> : false}
    </div>
);
