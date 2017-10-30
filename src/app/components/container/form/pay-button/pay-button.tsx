import * as React from 'react';
import * as styles from './pay-button.scss';
import * as cx from 'classnames';

interface IProps {
    icon?: string;
    placeholder?: string;
    mark?: boolean;
}

export class PayButton extends React.Component<IProps, {}> {
    render() {
        return (
            <button className={cx('button', '_primary', styles.button)}>
                Оплатить 3 144 599, 77 ₽
            </button>
        );
    }
}
