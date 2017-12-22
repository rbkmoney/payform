import * as React from 'react';
import * as styles from './terminal-pay.scss';

export class TerminalPay extends React.Component {
    render() {
        return (
            <div className={''}>
                <h4 className={styles.text}>Укажите телефон и почту, чтобы получить код для оплаты</h4>
                {/*<Input />*/}
            </div>
        );
    }
}
