import * as React from 'react';
import { connect } from 'react-redux';
import { clone } from 'lodash';
import { bindActionCreators, Dispatch } from 'redux';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { CardForm } from './card-form';
import { ErrorHandleStatus, State } from 'checkout/state';
import { PaymentMethods } from './payment-methods';
import { FormContainerProps } from './form-container-props';
import { FormLoader } from './form-loader';
import {
    changeStageStatus,
    changeStepStatus,
    createInvoiceWithTemplate,
    createPayment,
    createPaymentResource,
    pollInvoiceEvents,
    setErrorStatus,
    setFormFlowAction,
    setInvoiceAccessToken
} from 'checkout/actions';
import {
    add,
    FormFlowStatus,
    FormName,
    getActive, next, ResultFormFlowItem,
    ResultSubjectType
} from 'checkout/form-flow';
import { resolveFormFlow } from './form-flow-resolver';
import { ResultForm } from './result-form';

const mapStateToProps = (state: State) => ({
    config: state.config,
    model: state.model,
    formsFlow: state.formsFlow,
    cardPayment: state.lifecycle.cardPayment,
    error: state.error
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    createInvoiceWithTemplate: bindActionCreators(createInvoiceWithTemplate, dispatch),
    createPaymentResource: bindActionCreators(createPaymentResource, dispatch),
    createPayment: bindActionCreators(createPayment, dispatch),
    changeStepStatus: bindActionCreators(changeStepStatus, dispatch),
    changeStageStatus: bindActionCreators(changeStageStatus, dispatch),
    setInvoiceAccessToken: bindActionCreators(setInvoiceAccessToken, dispatch),
    pollInvoiceEvents: bindActionCreators(pollInvoiceEvents, dispatch),
    setFormFlow: bindActionCreators(setFormFlowAction, dispatch),
    setErrorStatus: bindActionCreators(setErrorStatus, dispatch)
});

class FormContainerDef extends React.Component<FormContainerProps> {

    constructor(props: FormContainerProps) {
        super(props);
    }

    componentWillMount() {
        resolveFormFlow(this.props);
    }

    componentWillReceiveProps(props: FormContainerProps) {
        if (props.error && props.error.status === ErrorHandleStatus.unhandled) {
            const flow = next(add(props.formsFlow, {
                formName: FormName.resultForm,
                active: false,
                status: FormFlowStatus.processed,
                subject: {
                    type: ResultSubjectType.error,
                    error: props.error.error
                }
            } as ResultFormFlowItem));
            props.setFormFlow(flow);
            props.setErrorStatus(ErrorHandleStatus.processed);
        } else {
            resolveFormFlow(props);
        }
    }

    render() {
        const {formName, status} = getActive(this.props.formsFlow);
        return (
            <div className={styles.container}>
                <div className={cx(styles.form, {[styles._error]: status === FormFlowStatus.error})}>
                    {formName === FormName.paymentMethods ? <PaymentMethods/> : false}
                    {formName === FormName.cardForm ? <CardForm/> : false}
                    {formName === FormName.resultForm ? <ResultForm/> : false}
                    {status === FormFlowStatus.inProcess ? <FormLoader/> : false}
                </div>
            </div>
        );
    }
}

export const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainerDef);
