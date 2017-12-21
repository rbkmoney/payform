import * as React from 'react';
import { connect } from 'react-redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { bindActionCreators, Dispatch } from 'redux';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { CardForm } from './card-form';
import { State } from 'checkout/state';
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
    setFormFlowAction,
    setInvoiceAccessToken
} from 'checkout/actions';
import { CardFormFlowItem, FormFlowStatus, FormName, getActive, getByFormName } from 'checkout/form-flow';
import { resolveFormFlow } from './form-flow-resolver';
import { ResultForm } from './result-form';

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

    componentWillMount() {
        resolveFormFlow(this.props);
    }

    componentWillReceiveProps(props: FormContainerProps) {
        resolveFormFlow(props);
    }

    isCardFormAmount(): boolean {
        const {formName} = getActive(this.props.formsFlow);
        if (formName === FormName.cardForm || formName === FormName.modalInteraction) {
            const cardForm = getByFormName(this.props.formsFlow, FormName.cardForm) as CardFormFlowItem;
            return cardForm.amountConfig.visible;
        }
    }

    render() {
        const {formName, status, view} = getActive(this.props.formsFlow);
        return (
            <div className={styles.container}>
                <div className={cx(styles.form, {
                    [styles._error]: status === FormFlowStatus.error,
                    [(styles as any)[view.formSizeClass]]: true
                })}>
                    <CSSTransitionGroup
                        component='div'
                        transitionName={view.slideDirection}
                        transitionEnterTimeout={550}
                        transitionLeaveTimeout={550}
                    >
                        {formName === FormName.paymentMethods ? <PaymentMethods/> : null}
                        {formName === FormName.cardForm ? <CardForm/> : null}
                        {formName === FormName.resultForm ? <ResultForm/> : null}
                    </CSSTransitionGroup>
                    <CSSTransitionGroup
                        component='div'
                        transitionName={{
                            appear: styles.appearLoader,
                            enter: styles.enterLoader,
                            leave: styles.leaveLoader
                        }}
                        transitionLeaveTimeout={450}
                        transitionEnterTimeout={450}
                        transitionAppearTimeout={450}
                        transitionAppear={true}
                        transitionEnter={true}
                        transitionLeave={true}
                    >
                        {status === FormFlowStatus.inProcess ? <FormLoader/> : null}
                    </CSSTransitionGroup>
                </div>
            </div>
        );
    }
}

export const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainerDef);
