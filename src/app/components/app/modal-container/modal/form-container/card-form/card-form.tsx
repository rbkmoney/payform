import * as React from 'react';
import * as styles from './card-form.scss';
import * as formStyles from '../form-container.scss';
import * as commonFormStyles from 'checkout/styles/forms.scss';
import { Button } from '../button';
import { Icon, IconType } from 'checkout/components/ui';
import { CardNumber, ExpireDate, SecureCode, CardHolder, Email } from './fields';

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
        <div className={commonFormStyles.formGroup}>
            <CardNumber/>
        </div>
        <div className={commonFormStyles.formGroup}>
            <ExpireDate/>
            <SecureCode/>
        </div>
        <div className={commonFormStyles.formGroup}>
            <CardHolder/>
        </div>
        <div className={commonFormStyles.formGroup}>
            <Email/>
        </div>
        <Button className={styles.pay_button} type='primary'>Оплатить 3 144 599, 77 ₽</Button>
    </form>
);

export const CardForm = CardFormDef;
