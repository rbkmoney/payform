import * as React from 'react';
import * as styles from './final.scss';
import * as cx from 'classnames';
import {Button} from '../../../index';

export class Final extends React.Component {
    render() {
        return (
            <form className={styles.form}>
                <h2 className={styles.title}>Не оплачено</h2>
                <img className={styles.image} src='https://avatanplus.com/files/resources/mid/56ece2c5863321538d55d3ae.png'/>
                <p className={styles.text}>Не хватает денег на карте<br /> Сбербанк *4576</p>
                <div className={cx(styles.link_container, styles.help)}>
                    <a href='' className={styles.link}>Как решить проблему?</a>
                    <hr/>
                </div>
                <Button style='primary'>Попробовать ещё раз</Button>
                <Button style='default' className={styles.pay_with_other}>Оплатить другой картой</Button>
                <div className={styles.link_container}>
                    <a href='' className={styles.link}>Другие способы оплаты</a>
                    <hr/>
                </div>
            </form>
        );
    }
}
