import * as React from 'react';
import * as styles from './help.scss';
import * as formStyles from '../forms.scss';

export class Help extends React.Component {
    render() {
        return (
            <form>
                <div className={formStyles.title}>
                    Как решить проблему?
                </div>
                <ul className={styles.list}>
                    <li className={styles.list_item}>
                        <div className={styles.list_item_number}>
                            1
                        </div>
                        <div className={styles.list_item_text}>
                            Обратитесь в банк, в котором выпущена ваша карта по телефону 8 (800) 555-35-35.
                        </div>
                    </li>
                    <li className={styles.list_item}>
                        <div className={styles.list_item_number}>
                            2
                        </div>
                        <div className={styles.list_item_text}>
                            Сообщите сотруднику банка паспортные данные, кодовое слово, сумму и номер заказа.
                        </div>
                    </li>
                    <li className={styles.list_item}>
                        <div className={styles.list_item_number}>
                            3
                        </div>
                        <div className={styles.list_item_text}>
                            Банк решит вашу проблему в течение 2 дней и вы сможете оплатить заказ.
                        </div>
                    </li>
                </ul>
            </form>
        );
    }
}
