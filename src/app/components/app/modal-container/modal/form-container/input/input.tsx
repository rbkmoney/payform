import * as React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
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
            className={cx(styles.input, {[styles.mark]: props.mark})}
            placeholder={props.placeholder}
            ref={(input) => input && props.formatter ? props.formatter(input) : false}
            type={props.type}
            value={props.value}
        />
        <CSSTransitionGroup
            component='div'
            transitionName={{
                appear: styles.appearMarks,
                enter: styles.enterMarks,
                leave: styles.leaveMarks
            }}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionAppearTimeout={500}
            transitionAppear={true}
            transitionEnter={true}
            transitionLeave={true}
        >
            {props.mark && !props.active && !props.error && !props.pristine ? <Icon className={styles.checkmark} icon={IconType.checkmark}/> : false}
            {props.mark && !props.active && props.error ? <Icon className={styles.errorCross} icon={IconType.redCross}/> : false }
        </CSSTransitionGroup>
    </div>
);
