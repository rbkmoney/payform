import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { CardForm } from './card-form';
import { ConfigState, ModelState, State, FormFlowItem, FormName } from 'checkout/state';
import { isRequiredAmountForm } from './is-required-amount-form';
import { isRequiredPaymentMethods } from './is-required-payment-methods';
import { setFormFlowAction, SetFormsFlowAction } from 'checkout/actions';
import { add, getActive, init } from './form-flow-manager';
import { AmountForm } from './amount-form';
import { PaymentMethods } from './payment-methods';
import { InitConfig } from 'checkout/config';

export interface FormContainerProps {
    config: ConfigState;
    model: ModelState;
    formsFlow: FormFlowItem[];
    setFormFlow: (formFlow: FormFlowItem[]) => SetFormsFlowAction;
}

const mapStateToProps = (state: State) => ({
    config: state.config,
    model: state.model,
    formsFlow: state.formsFlow
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormFlow: bindActionCreators(setFormFlowAction, dispatch)
});

const prepareInitFormsFlow = (initConfig: InitConfig, model: ModelState): FormFlowItem[] => {
    let result: FormFlowItem[] = [];
    if (isRequiredAmountForm(initConfig, model)) {
        result = add(result, FormName.paymentAmountForm);
    }
    if (isRequiredPaymentMethods(initConfig, model)) {
        result = add(result, FormName.paymentMethods);
    } else {
        result = add(result, FormName.cardForm);
    }
    result = init(result);
    return result;
};

class FormContainerDef extends React.Component<FormContainerProps> {

    constructor(props: FormContainerProps) {
        super(props);
    }

    componentWillMount() {
        const initFlow = prepareInitFormsFlow(this.props.config.initConfig, this.props.model);
        this.props.setFormFlow(initFlow);
    }

    render() {
        const active = getActive(this.props.formsFlow);
        return (
            <div className={styles.container}>
                <div className={cx(styles.form, {[styles._error]: false})}>
                    {active && active.formName === FormName.paymentAmountForm ? <AmountForm/> : false}
                    {active && active.formName === FormName.paymentMethods ? <PaymentMethods/> : false}
                    {active && active.formName === FormName.cardForm ? <CardForm/> : false}
                </div>
            </div>
        );
    }
}

export const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainerDef);
