import * as React from 'react';
import { connect } from 'react-redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { bindActionCreators, Dispatch } from 'redux';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { CardForm } from './card-form';
import { ErrorHandleStatus, FormInfo, FormName, ModalForms, State } from 'checkout/state';
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
    FormFlowStatus,
    getActive, next, add,
    ResultFormFlowItem,
    ResultSubjectType,
    DirectionTransition
} from 'checkout/form-flow';
import { resolveFormFlow } from './form-flow-resolver';
import { ResultForm } from './result-form';
import { ResultSubjectError } from 'checkout/form-flow/flow-item/result-form-flow-item';

const mapStateToProps = (state: State) => ({
    config: state.config,
    model: state.model,
    formsFlow: state.formsFlow,
    cardPayment: state.lifecycle.cardPayment,
    error: state.error,
    formInfo: (state.modal as ModalForms).formInfo
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

    componentWillReceiveProps(props: FormContainerProps) {
        // if (props.error && props.error.status === ErrorHandleStatus.unhandled) {
        //     const flow = next(add(props.formsFlow, new ResultFormFlowItem({
        //         formName: FormName.resultForm,
        //         active: false,
        //         status: FormFlowStatus.processed,
        //         subject: {
        //             type: ResultSubjectType.error,
        //             error: props.error.error
        //         } as ResultSubjectError,
        //         view: {
        //             slideDirection: DirectionTransition.right,
        //             height: 392
        //         }
        //     })));
        //     props.setFormFlow(flow);
        //     props.setErrorStatus(ErrorHandleStatus.processed);
        // } else {
        //     resolveFormFlow(props);
        // }
    }

    render() {
        const {name, viewInfo} = this.props.formInfo;
        return (
            <div className={styles.container}>
                <div className={cx(styles.form, {
                    [styles._error]: viewInfo.error
                })}
                     style={{height: viewInfo.height}}>
                    <CSSTransitionGroup
                        component='div'
                        transitionName={viewInfo.slideDirection}
                        transitionEnterTimeout={550}
                        transitionLeaveTimeout={550}
                    >
                        {name === FormName.paymentMethods ? <PaymentMethods/> : null}
                        {name === FormName.cardForm ? <CardForm/> : null}
                        {name === FormName.resultForm ? <ResultForm/> : null}
                    </CSSTransitionGroup>
                    <CSSTransitionGroup
                        component='div'
                        transitionName={{
                            appear: styles.appearLoader,
                            enter: styles.enterLoader,
                            leave: styles.leaveLoader
                        }}
                        transitionLeaveTimeout={200}
                        transitionEnterTimeout={450}
                        transitionAppearTimeout={450}
                        transitionAppear={true}
                        transitionEnter={true}
                        transitionLeave={true}
                    >
                        {viewInfo.inProcess ? <FormLoader/> : null}
                    </CSSTransitionGroup>
                </div>
            </div>
        );
    }
}

export const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainerDef);
