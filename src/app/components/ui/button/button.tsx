import * as React from 'react';
import * as styles from './button.scss';
import * as cx from 'classnames';

interface IProps {
    type: string;
    className?: string;
    children: React.ReactNode;
}

export class Button extends React.Component<IProps, {}> {
    static getTypeClass(type: string): string {
        switch (type) {
            case 'primary':
                return styles._primary;
            case 'default':
            default:
                return styles._default;
        }
    }

    render() {
        return (
            <button className={cx(styles.button, Button.getTypeClass(this.props.type), this.props.className)}>
                {this.props.children}
            </button>
        );
    }
}
