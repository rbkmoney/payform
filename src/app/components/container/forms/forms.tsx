import * as React from 'react';
import * as cx from 'classnames';
import * as styles from './forms.scss';
import {PaymentMethods, CardPay, Final, Help, FormLoader} from '../../index';

export class Form extends React.Component {
    getView(): string {
        switch (window.location.search) {
            case '?view=card_pay':
                return 'card_pay';
            case '?view=final':
                return 'final';
            case '?view=help':
                return 'help';
            case '?view=loading':
                return 'loading';
            case '?view=methods':
            default:
                return 'methods';
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={cx(styles.form, {
                    [styles._error]: false
                })}>
                    {this.getView() === 'methods' ? <PaymentMethods/> : false}
                    {this.getView() === 'card_pay' || this.getView() === 'loading' ? <CardPay/> : false}
                    {this.getView() === 'final' ? <Final/> : false}
                    {this.getView() === 'help' ? <Help/> : false}
                    {this.getView() === 'loading' ? <FormLoader /> : false}
                </div>
            </div>
        );
    }
}
