import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import * as viewDataActions from '../../../actions/viewDataActions';
import * as invoiceActions from '../../../actions/invoiceActions';
import * as resultActions from '../../../actions/resultActions';
import * as paymentActions from '../../../actions/paymentActions';
import Interaction from '../elements/Interaction';
import BackButton from '../elements/BackButton';
import ErrorPanel from '../elements/ErrorPanel';
import PayButton from '../elements/PayButton';
import CardNumber from '../elements/CardNumber';
import CardExpire from '../elements/CardExpire';
import CardCvv from '../elements/CardCvv';
import CardHolder from '../elements/CardHolder';
import Email from '../elements/Email';
import Amount from '../elements/Amount';
import settings from '../../../../settings';
import processCardPayment from './processCardPayment';
import pollEvents from '../../../backendCommunication/eventPoller/pollEvents';

class CardForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shakeValidation: false,
            back: false
        };
        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                this.props.actions.paymentActions.resumePayment();
                this.props.actions.viewDataActions.updateContainerSize('default');
                this.getEvents(this.props.integration.invoiceAccessToken);
            }
        });
        this.triggerError = this.triggerError.bind(this);
        this.pay = this.pay.bind(this);
    }

    componentDidMount() {
        this.props.actions.viewDataActions.setCardSetRequired(true);
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
                processCardPayment(nextProps)
                    .then((event) => this.handleEvent(event))
                    .catch((error) => this.handleError(error));
                break;
            case 'pollEvents':
                this.getEvents(nextProps.integration.invoiceAccessToken);
        }
    }

    getEvents(token) {
        pollEvents({
            capiEndpoint: this.props.appConfig.capiEndpoint,
            accessToken: token,
            invoiceID: this.props.integration.invoice.id
        })
            .then((event) => this.handleEvent(event))
            .catch(error => this.handleError(error));
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

    handleError(error) {
        this.props.actions.paymentActions.setPaymentError(error);
        this.triggerError();
    }

    handleSuccess() {
        this.props.actions.paymentActions.finish();
        this.props.actions.resultActions.setDone();
        if (this.props.initParams.popupMode && history.length > 1) {
            setTimeout(() => this.setState({back: true}), settings.closeFormTimeout + 100);
        }
    }

    handleInteract(event) {
        this.props.actions.paymentActions.interactPayment(event.data);
        this.props.actions.viewDataActions.updateContainerSize('large');
    }

    triggerError() {
        this.setState({shakeValidation: true});
        setTimeout(() => this.setState({shakeValidation: false}), 500);
    }

    pay(e) {
        e.preventDefault();
        const form = this.props.viewData.cardForm;
        this.props.actions.viewDataActions.validateForm(form);
        this.props.actions.paymentActions.start();
    }

    renderPayform() {
        const form = 'card-form';
        const status = this.props.payment.status;
        const cardForm = this.props.viewData.cardForm;
        const email = cardForm.email;
        const amount = cardForm.amount;
        return (
            <form
                className={cx('payform--form', {_error: this.state.shakeValidation})}
                id={form}
                role="form"
                onSubmit={this.pay}
                noValidate>
                <fieldset className="payform--fieldset">
                    <CardNumber/>
                    <CardExpire/>
                    <CardCvv/>
                </fieldset>
                <fieldset className="payform--fieldset">
                    <CardHolder/>
                </fieldset>
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
        locale: state.locale,
        viewData: state.viewData,
        payment: state.payment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch),
            invoiceActions: bindActionCreators(invoiceActions, dispatch),
            resultActions: bindActionCreators(resultActions, dispatch),
            paymentActions: bindActionCreators(paymentActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
