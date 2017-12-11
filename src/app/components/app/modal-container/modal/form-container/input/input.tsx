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
            {props.mark && !props.active && !props.error ? <Icon className={styles.checkmark} icon={IconType.checkmark}/> : false}
            {props.mark && !props.active && props.error ?
                <svg className={styles.errorCross} width='18px' height='18px' viewBox='0 0 18 18'>
                    <g id='icon' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                        <g transform='translate(-1045.000000, -38.000000)' fill='red'>
                            <g transform='translate(1054.000000, 47.000000) rotate(-45.000000) translate(-1054.000000, -47.000000) translate(1043.000000, 36.000000)'>
                                <path
                                    d='M12,10 L12,0 L10,0 L10,10 L-1.13686838e-13,10 L-1.13686838e-13,12 L10,12 L10,22 L12,22 L12,12 L22,12 L22,10 L12,10 Z'/>
                            </g>
                        </g>
                    </g>
                </svg>
                :
                false
            }
        </CSSTransitionGroup>
    </div>
);
