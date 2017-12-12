import { connect } from 'react-redux';
import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import * as styles from './card-form.scss';
import * as formStyles from '../form-container.scss';
import * as commonFormStyles from 'checkout/styles/forms.scss';
import { Button } from '../button';
import {
    Amount,
    CardHolder,
    CardNumber,
    Email,
    ExpireDate,
    SecureCode
} from './fields';
import { ChevronBack } from '../chevron-back';
import { ConfigState, FormFlowItem, ModelState, State, CardFormFlowItem } from 'checkout/state';
import { getActive, hasBack } from 'checkout/components/app/form-flow-manager';
import { getAmount } from '../../amount-resolver';
import { formatAmount } from 'checkout/utils';

export interface CardFormProps {
    formsFlow: FormFlowItem[];
    config: ConfigState;
    model: ModelState;
    formFlow: CardFormFlowItem;
}

const PayButton: React.SFC<CardFormProps> = (props) => {
    const amount = formatAmount(getAmount(props.config.initConfig.integrationType, props.model));
    const label = amount ? `${amount.value} ${amount.symbol}` : null;
    return <Button className={styles.pay_button} type='submit' style='primary'>Оплатить {label}</Button>;
};

const CardFormDef: React.SFC<InjectedFormProps & CardFormProps> = (props) => (
    <form>
        <div className={formStyles.header}>
            {hasBack(props.formsFlow) ? <ChevronBack/> : null}
            <div className={formStyles.title}>
                Оплата банковской картой
            </div>
        </div>
        {props.formFlow.amountConfig.visible ?
            <div className={commonFormStyles.formGroup}>
                <Amount/>
            </div> : false
        }
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
        <PayButton {...props}/>
    </form>
);

const ReduxForm = reduxForm({
    form: 'cardForm',
    destroyOnUnmount: false
})(CardFormDef);

const mapStateToProps = (state: State) => ({
    formsFlow: state.formsFlow,
    config: state.config,
    model: state.model,
    formFlow: getActive(state.formsFlow)
});

export const CardForm = connect(mapStateToProps, null)(ReduxForm);
