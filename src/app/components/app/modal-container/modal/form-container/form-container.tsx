import * as React from 'react';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { CardForm } from './card-form';
import { ConfigState, ModelState, State, FormFlowItem, FormName } from 'checkout/state';
import { AmountForm } from './amount-form';
import { PaymentMethods } from './payment-methods';
import { getActive } from 'checkout/components/app/form-flow-manager';

export interface FormContainerProps {
    config: ConfigState;
    model: ModelState;
    formsFlow: FormFlowItem[];
}

const mapStateToProps = (state: State) => ({
    config: state.config,
    model: state.model,
    formsFlow: state.formsFlow
});

class FormContainerDef extends React.Component<FormContainerProps> {

    constructor(props: FormContainerProps) {
        super(props);
    }

    render() {
        const active = getActive(this.props.formsFlow);
        return (
            <div className={styles.container}>
                <div className={cx(styles.form, {[styles._error]: false})}>
                    {active.formName === FormName.paymentAmountForm ? <AmountForm/> : false}
                    {active.formName === FormName.paymentMethods ? <PaymentMethods/> : false}
                    {active.formName === FormName.cardForm ? <CardForm/> : false}
                </div>
            </div>
        );
    }
}

export const FormContainer = connect(mapStateToProps)(FormContainerDef);
