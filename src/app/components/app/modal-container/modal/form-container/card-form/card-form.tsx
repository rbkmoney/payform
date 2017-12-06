import * as React from 'react';
import { reduxForm } from 'redux-form';
import * as styles from './card-form.scss';
import * as formStyles from '../form-container.scss';
import * as commonFormStyles from 'checkout/styles/forms.scss';
import { Button } from '../button';
import { CardNumber, ExpireDate, SecureCode, CardHolder, Email } from './fields';
import { ChevronBack } from '../chevron-back';

const CardFormDef: React.SFC = () => (
    <form>
        <div className={formStyles.header}>
            <ChevronBack/>
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
        <Button className={styles.pay_button} type='submit' style='primary'>Оплатить 3 144 599, 77 ₽</Button>
    </form>
);

export const CardForm = reduxForm({
    form: 'cardForm'
})(CardFormDef);
