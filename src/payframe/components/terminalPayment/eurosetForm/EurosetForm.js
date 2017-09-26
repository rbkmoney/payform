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
import Interaction from '../../elements/Interaction';

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
                console.log('EurosetForm', nextProps);
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
        console.log(error);
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

    handleInteract() {
        //this.props.actions.paymentActions.interactPayment(event.data);
        this.props.actions.viewDataActions.updateContainerSize('large');
    }

    pay(e) {
        e.preventDefault();
        const form = this.props.viewData.cardForm;
        this.props.actions.viewDataActions.validateForm(form);
        this.props.actions.paymentActions.start();
    }

    renderPayform() {
        const form = 'card-form';
        const cardForm = this.props.viewData.cardForm;
        const email = cardForm.email;
        const amount = cardForm.amount;

        return(
            <form className={cx('payform--form', {_error: this.state.shakeValidation})}
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
                        ? <Interaction
                            interactionData={this.props.payment.interactionData}
                            host={this.props.appConfig.host}/>
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
        //locale: state.locale,
        viewData: state.viewData,
        payment: state.payment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch),
            //invoiceActions: bindActionCreators(invoiceActions, dispatch),
            //resultActions: bindActionCreators(resultActions, dispatch),
            paymentActions: bindActionCreators(paymentActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EurosetForm);