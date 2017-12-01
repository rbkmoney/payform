import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import * as styles from './card-form.scss';
import * as formStyles from '../form-container.scss';
import * as commonFormStyles from 'checkout/styles/forms.scss';
import { Button } from '../button';
import { Icon, IconType } from 'checkout/components/ui';
import { CardNumber, ExpireDate, SecureCode, CardHolder, Email } from './fields';

const CardFormDef: React.SFC<any> = (props) => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className={formStyles.header}>
                <div className={formStyles.back_btn}>
                    <Icon icon={IconType['chevron-left']}/>
                </div>
                <div className={formStyles.title}>
                    Оплата банковской картой
                </div>
            </div>
            <div className={commonFormStyles.formGroup}>
                <Field
                    name='cardNumber'
                    component={(data: any) => {
                        return <CardNumber onChange={(param: any) => {
                                                data.input.onChange(param.target.value)
                                            }}
                                           currentValue={{val: data.value}}/>
                    }}
                />
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
};

export const CardForm = reduxForm({
  form: 'cardForm'
})(CardFormDef);
