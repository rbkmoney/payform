import * as React from 'react';
import * as styles from './input.scss';
import * as cx from 'classnames';
import { Icon } from '../../../index';

interface IProps {
    icon?: string;
    placeholder?: string;
    mark?: boolean;
}

export class Input extends React.Component<IProps, {}> {
    render() {
        return (
            <div className={cx(styles.container, {
                [styles._correct]: true
            })}>
                {this.props.icon ? <Icon className={styles.icon} icon={this.props.icon} /> : false}
                <input className={cx(styles.input, {
                    [styles.mark]: this.props.mark
                })} placeholder={this.props.placeholder}/>
                {this.props.mark ? <Icon className={styles.checkmark} icon='checkmark' /> : false}
            </div>
        );
    }
}
