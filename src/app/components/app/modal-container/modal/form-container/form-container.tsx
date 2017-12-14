import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { CardForm } from './card-form';
import { State, FormName, FormFlowStatus } from 'checkout/state';
import { PaymentMethods } from './payment-methods';
import { getActive } from 'checkout/components/app/form-flow-manager';
import { resolveFormFlow } from './form-flow-resolver';
import { FormContainerProps } from './form-container-props';
import { FormLoader } from './form-loader';
import {
    changeStageStatus,
    changeStepStatus,
    createInvoiceWithTemplate,
    createPayment,
    createPaymentResource,
    pollInvoiceEvents,
    setFormFlowAction,
    setInvoiceAccessToken
} from 'checkout/actions';

const mapStateToProps = (state: State) => ({
    config: state.config,
    model: state.model,
    formsFlow: state.formsFlow,
    cardPayment: state.lifecycle.cardPayment
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    createInvoiceWithTemplate: bindActionCreators(createInvoiceWithTemplate, dispatch),
    createPaymentResource: bindActionCreators(createPaymentResource, dispatch),
    createPayment: bindActionCreators(createPayment, dispatch),
    changeStepStatus: bindActionCreators(changeStepStatus, dispatch),
    changeStageStatus: bindActionCreators(changeStageStatus, dispatch),
    setInvoiceAccessToken: bindActionCreators(setInvoiceAccessToken, dispatch),
    pollInvoiceEvents: bindActionCreators(pollInvoiceEvents, dispatch),
    setFormFlow: bindActionCreators(setFormFlowAction, dispatch)
});

class FormContainerDef extends React.Component<FormContainerProps> {

    constructor(props: FormContainerProps) {
        super(props);
    }

    componentWillReceiveProps(props: FormContainerProps) {
        resolveFormFlow(props);
    }

    render() {
        const {formName, status} = getActive(this.props.formsFlow);
        return (
            <div className={styles.container}>
                <div className={cx(styles.form, {[styles._error]: status === FormFlowStatus.error})}>
                    {formName === FormName.paymentMethods ? <PaymentMethods/> : false}
                    {formName === FormName.cardForm ? <CardForm/> : false}
                    {status === FormFlowStatus.inProcess ? <FormLoader/> : false}
                </div>
            </div>
        );
    }
}

export const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainerDef);
