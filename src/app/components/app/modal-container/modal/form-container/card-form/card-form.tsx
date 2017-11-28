import * as React from 'react';
import * as styles from './card-form.scss';
import * as formStyles from '../form-container.scss';
import { Button } from '../../../../../ui/button/button';
import { Input } from '../../../../../ui/input/input';
import { Icon } from '../../../../../ui/icon/icon';

const CardFormDef: React.SFC = () => (
    <form>
        <div className={formStyles.header}>
            <div className={formStyles.back_btn}>
                <Icon icon='chevron-left'/>
            </div>
            <div className={formStyles.title}>
                Оплата банковской картой
            </div>
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

export const CardForm = CardFormDef;
