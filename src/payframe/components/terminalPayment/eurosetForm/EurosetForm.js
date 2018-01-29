import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import * as viewDataActions from '../../../actions/viewDataActions';
import * as paymentActions from '../../../actions/paymentActions';
import processTerminalPayment from '../processTerminalPayment';
import Email from '../../elements/Email';
import Amount from '../../elements/Amount';
import BackButton from '../../elements/BackButton';
import ErrorPanel from '../../elements/ErrorPanel';
import PayButton from '../../elements/PayButton';
import TerminalInteraction from '../../elements/TerminalInteraction';

class EurosetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shakeValidation: false,
            back: false
        };
        this.triggerError = this.triggerError.bind(this);
        this.pay = this.pay.bind(this);
    }

    componentDidMount() {
        this.props.actions.viewDataActions.setCardSetRequired(false);
        this.props.actions.viewDataActions.resetValidation();
        this.props.actions.paymentActions.reset();
    }

    componentWillReceiveProps(nextProps) {
        const paymentActions = nextProps.actions.paymentActions;
        const integration = nextProps.integration;
        switch (nextProps.payment.status) {
            case 'started':
                if (nextProps.viewData.cardForm.valid) {
                    if (integration.type === 'default') {
                        paymentActions.processPayment();
                    } else if (integration.type === 'template') {
                        paymentActions.processInvoiceTemplate();
                    }
                } else {
                    paymentActions.reset();
                    this.triggerError();
                }
                break;
            case 'processPayment':
                processTerminalPayment(nextProps)
                    .then((event) => this.handleEvent(event))
                    .catch((error) => this.handleError(error));
                break;
            case 'pollEvents':
                this.getEvents(nextProps.integration.invoiceAccessToken);
        }
    }

    triggerError() {
        this.setState({shakeValidation: true});
        setTimeout(() => this.setState({shakeValidation: false}), 500);
    }

    handleError(error) {
        this.props.actions.paymentActions.setPaymentError(error);
        this.triggerError();
    }

    handleEvent(event) {
        if (event.type === 'interact') {
            this.handleInteract(event);
        } else if (event.type === 'paid' || event.type === 'processed') {
            this.handleSuccess();
        } else {
            this.handleError({code: 'error.payment.unsupport'});
        }
    }

    handleInteract(event) {
        this.props.actions.paymentActions.interactTerminalPayment(event.data);
    }

    pay(e) {
        e.preventDefault();
        const form = this.props.viewData.cardForm;
        this.props.actions.viewDataActions.validateForm(form);
        this.props.actions.paymentActions.start();
    }

    renderPayform() {
        const form = 'card-formContainer';
        const cardForm = this.props.viewData.cardForm;
        const status = this.props.payment.status;
        const email = cardForm.email;
        const amount = cardForm.amount;

        return(
            <form className={cx('payform--formContainer', {_error: this.state.shakeValidation})}
                id={form}
                role="form"
                onSubmit={this.pay}
                noValidate>
                {
                    email.visible ?
                        <fieldset className="payform--fieldset">
                            <Email/>
                        </fieldset> : false
                }
                {
                    amount.visible ?
                        <fieldset className="payform--fieldset">
                            <Amount/>
                        </fieldset> : false
                }
                {
                    status === 'error' ? <ErrorPanel/> : false
                }
                {
                    this.state.back
                        ? <BackButton locale={this.props.locale}/>
                        : <PayButton
                            form={form}
                            checkmark={status === 'finished'}
                            spinner={
                                status === 'processInvoiceTemplate'
                                || status === 'processPayment'
                                || status === 'pollEvents'
                            }/>
                }
            </form>
        );
    }

    render() {
        return (
            <div className="payform">
                {
                    this.props.payment.status === 'interacted'
                        ? <TerminalInteraction interactionData={this.props.payment.interactionData}/>
                        : this.renderPayform()
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        appConfig: state.appConfig,
        initParams: state.initParams,
        integration: state.integration,
        viewData: state.viewData,
        payment: state.payment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch),
            paymentActions: bindActionCreators(paymentActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EurosetForm);