import * as React from 'react';
import * as styles from './card-form.scss';
import * as formStyles from '../form-container.scss';
import { Button } from '../button';
import { Input } from '../input';
import { Icon } from '../../../../../ui/icon';
import { CardNumber } from './fields/card-number';
import {IconType} from '../../../../../ui/icon/icon-type';

const CardFormDef: React.SFC = () => (
    <form>
        <div className={formStyles.header}>
            <div className={formStyles.back_btn}>
                <Icon icon={IconType.chevronLeft}/>
            </div>
            <div className={formStyles.title}>
                Оплата банковской картой
            </div>
        </div>
        <div className='form-group'>
            <CardNumber />
        </div>
        <div className='form-group'>
            <Input icon={IconType.calendar} placeholder='ММ/ГГ'/> <Input icon={IconType.lock} placeholder='CVV/CVC'/>
        </div>
        <div className='form-group'>
            <Input icon={IconType.user} placeholder='Имя на карте'/>
        </div>
        <div className='form-group'>
            <Input icon={IconType.letter} placeholder='Email для чека'/>
        </div>
        <Button className={styles.pay_button} type='primary'>Оплатить 3 144 599, 77 ₽</Button>
    </form>
);

export const CardForm = CardFormDef;
