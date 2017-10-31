import * as React from 'react';
import * as styles from './button.scss';
import * as cx from 'classnames';

interface IProps {
    type: string;
    className?: string;
}

export class Button extends React.Component<IProps, {}> {
    getTypeClass(type: string): string {
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
            <button className={cx(styles.button, this.getTypeClass(this.props.type), this.props.className)}>
                {this.props.children}
            </button>
        );
    }
}
