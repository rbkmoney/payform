import * as React from 'react';
import * as styles from './card-form.scss';
import * as formStyles from '../form-container.scss';
import { Button } from '../button';
import { IconType } from 'checkout/components/ui';
import { CardNumber } from './fields/card-number';
import { ExpireDate } from './fields/expire-date';
import { SecureCode } from './fields/secure-code';
import { CardHolder } from './fields/card-holder';
import { Email } from './fields/email';

const CardFormDef: React.SFC = () => (
    <form>
        <div className={formStyles.header}>
            <div className={formStyles.back_btn}>
                <Icon icon={IconType['chevron-left']}/>
            </div>
            <div className={formStyles.title}>
                Оплата банковской картой
            </div>
        </div>
        <div className='form-group'>
            <CardNumber />
        </div>
        <div className='form-group'>
            <ExpireDate /> <SecureCode />
        </div>
        <div className='form-group'>
            <CardHolder />
        </div>
        <div className='form-group'>
            <Email />
        </div>
        <Button className={styles.pay_button} type='primary'>Оплатить 3 144 599, 77 ₽</Button>
    </form>
);

export const CardForm = CardFormDef;
