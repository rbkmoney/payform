import * as React from 'react';
import * as styles from './forms.scss';
import {PaymentMethods, CardPay, Final, Help} from '../../index';

export class Form extends React.Component {
    getView(): string {
        switch (window.location.search) {
            case '?view=card_pay':
                return 'card_pay';
            case '?view=final':
                return 'final';
                case '?view=help':
                return 'help';
            case '?view=methods':
            default:
                return 'methods';
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.form}>
                    {this.getView() === 'methods' ? <PaymentMethods/> : false}
                    {this.getView() === 'card_pay' ? <CardPay/> : false}
                    {this.getView() === 'final' ? <Final/> : false}
                    {this.getView() === 'help' ? <Help/> : false}
                </div>
            </div>
        );
    }
}
