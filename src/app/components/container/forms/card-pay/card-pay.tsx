import * as React from 'react';
import * as styles from './card-pay.scss';
import * as formStyles from '../forms.scss';
import {Input, Button} from '../../../index';

export class CardPay extends React.Component {
    render() {
        return (
            <form>
                <div className={formStyles.title}>
                    Оплата банковской картой
                </div>
                <div className='form-group'>
                    <Input icon='card' placeholder='Номер на карте'/>
                </div>
                <div className='form-group'>
                    <Input icon='calendar' placeholder='ММ/ГГ'/> <Input icon='lock' placeholder='CVV/CVC'/>
                </div>
                <div className='form-group'>
                    <Input icon='user' placeholder='Имя на карте'/>
                </div>
                <div className='form-group'>
                    <Input icon='letter' placeholder='Email для чека'/>
                </div>
                <Button className={styles.pay_button} type='primary'>Оплатить 3 144 599, 77 ₽</Button>
            </form>
        );
    }
}
