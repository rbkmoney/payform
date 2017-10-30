import * as React from 'react';
import * as styles from './form.scss';
import { PaymentMethods, CardPay } from '../../index';

export class Form extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.form}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            {/*Выберите способ оплаты*/}
                            Оплата банковской картой
                        </div>
                    </div>
                    <div className={styles.body}>
                        {/*<PaymentMethods />*/}
                        <CardPay />
                    </div>
                </div>
            </div>
        );
    }
}
