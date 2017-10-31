import * as React from 'react';
import * as styles from './final.scss';
import * as cx from 'classnames';
import {Button} from '../../../index';

export class Final extends React.Component {
    render() {
        return (
            <form className={styles.form}>
                <h2 className={styles.title}>Не оплачено</h2>
                *тут рисуночек*
                <p className={styles.text}>Не хватает денег на карте Сбербанк *4576</p>
                <div className={cx(styles.link_container, styles.help)}>
                    <a href="" className={styles.link}>Как решить проблему?</a>
                    <hr/>
                </div>
                <Button type='primary'>Попробовать ещё раз</Button>
                <Button type='default' className={styles.pay_with_other}>Оплатить другой картой</Button>
                <div className={styles.link_container}>
                    <a href="" className={styles.link}>Другие способы оплаты</a>
                    <hr/>
                </div>
            </form>
        );
    }
}
