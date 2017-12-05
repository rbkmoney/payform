import * as React from 'react';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { CardForm } from './card-form';
import { State, FormName } from 'checkout/state';
import { PaymentMethods } from './payment-methods';
import { getActive } from 'checkout/components/app/form-flow-manager';

export interface FormContainerProps {
    activeForm: FormName;
}

const mapStateToProps = (state: State) => ({
    activeForm: getActive(state.formsFlow).formName
});

const FormContainerDef: React.SFC<FormContainerProps> = (props) => (
    <div className={styles.container}>
        <div className={cx(styles.form, {[styles._error]: false})}>
            {props.activeForm === FormName.paymentMethods ? <PaymentMethods/> : false}
            {props.activeForm === FormName.cardForm ? <CardForm/> : false}
        </div>
    </div>
);

export const FormContainer = connect(mapStateToProps)(FormContainerDef);
