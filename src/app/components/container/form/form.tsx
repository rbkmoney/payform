import * as React from 'react';
import * as styles from './form.scss';
import { PaymentMethods } from '../../index';

export class Form extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.form}>
                    <div className={styles.title}>
                        Выберите способ оплаты
                    </div>
                    <PaymentMethods />
                </div>
            </div>
        );
    }
}
