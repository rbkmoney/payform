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
import { CardFormFlowItem, FormFlowStatus, FormName, getActive, hasBack } from 'checkout/form-flow';
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

    componentWillReceiveProps(props: FormContainerProps) {
        resolveFormFlow(props);
    }

    isCardFormAmount() {
        const {formName} = getActive(this.props.formsFlow);
        if (formName === FormName.cardForm) {
            const cardForm = getActive(this.props.formsFlow) as CardFormFlowItem;
            return cardForm.amountConfig.visible;
        } else {
            return false;
        }
    }

    render() {
        const {formName, status} = getActive(this.props.formsFlow);
        const isHasBack = hasBack(this.props.formsFlow);
        return (
            <div className={styles.container}>
                <div className={cx(styles.form, {
                    [styles._error]: status === FormFlowStatus.error,
                    [styles._cardForm]: formName === FormName.cardForm,
                    [styles._cardFormAmount]: this.isCardFormAmount(),
                    [styles._resultForm]: formName === FormName.resultForm
                })}>
                    <CSSTransitionGroup
                        component='div'
                        transitionName={{
                            appear: isHasBack ? styles.appearForm : '123',
                            enter: isHasBack ? styles.enterForm : '123',
                            leave: styles.leaveForm
                        }}
                        transitionLeaveTimeout={500}
                        transitionEnterTimeout={500}
                        transitionAppearTimeout={500}
                        transitionAppear={true}
                        transitionEnter={true}
                        transitionLeave={true}
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
