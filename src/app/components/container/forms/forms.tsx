import * as React from 'react';
import * as styles from './forms.scss';
import {PaymentMethods, CardPay} from '../../index';

export class Form extends React.Component {
    getView(): string {
        switch (window.location.search) {
            case '?view=card_pay':
                return 'card_pay';
            case '?view=methods':
            default:
                return 'methods';
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.form}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            {this.getView() === 'methods' ? 'Выберите способ оплаты' : false}
                            {this.getView() === 'card_pay' ? 'Оплата банковской картой' : false}
                        </div>
                    </div>
                    <div className={styles.body}>
                        {this.getView() === 'methods' ? <PaymentMethods /> : false}
                        {this.getView() === 'card_pay' ? <CardPay/> : false}
                    </div>
                </div>
            </div>
        );
    }
}
