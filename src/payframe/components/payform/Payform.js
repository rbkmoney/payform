import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toNumber } from 'lodash';
import * as viewDataActions from '../../../redux/actions/viewDataActions';
import * as invoiceActions from '../../../redux/actions/invoiceActions';
import * as resultActions from '../../../redux/actions/resultActions';
import * as paymentActions from '../../../redux/actions/paymentActions';
import cx from 'classnames';
import ErrorPanel from './elements/ErrorPanel';
import PayButton from './elements/PayButton';
import BackButton from './elements/BackButton';
import Processing from '../../backend-communication/Processing';
import settings from '../../../settings';
import EventPoller from '../../backend-communication/EventPoller';
import Fieldset from './elements/Fieldset';
import Interaction from './elements/Interaction';
import { ApplePayWrapper } from '../../apple-pay';

class Payform extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            back: false
        };
        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                this.props.actions.paymentActions.resumePayment();
                this.props.actions.viewDataActions.updateContainerSize('default');
                this.getEvents();
            }
        });
        this.triggerError = this.triggerError.bind(this);
        this.pay = this.pay.bind(this);
    }

    componentDidMount() {
        // TODO fix it
        // switch (this.props.integration.type) {
        //     case 'default':
        //         this.props.actions.paymentActions.setToken(this.props.initParams.invoiceAccessToken);
        //         this.getEvents();
        //         break;
        // }
    }

    componentWillReceiveProps(nextProps) {
        const paymentActions = nextProps.actions.paymentActions;
        switch (nextProps.payment.status) {
            case 'started':
                if (nextProps.viewData.cardForm.valid) {
                    if (nextProps.integration.type === 'default') {
                        paymentActions.processPayment(nextProps.initParams.invoiceAccessToken);
                    } else if (nextProps.integration.type === 'template') {
                        paymentActions.processInvoiceTemplate();
                    }
                } else {
                    paymentActions.reset();
                    this.triggerError();
                }
                break;
            case 'processInvoiceTemplate':
                if (nextProps.integration.invoiceAccessToken) {
                    paymentActions.processPayment(nextProps.integration.invoiceAccessToken.payload);
                } else {
                    this.createInvoice(nextProps);
                }
                break;
            case 'processPayment':
                if (nextProps.paymentCapabilities.applePay === 'capable') {
                    this.applePayWrapper = new ApplePayWrapper(1000, 'Test product');
                    this.applePayWrapper.begin();
                } else {
                    this.processCardPayment(nextProps);
                }
                break;
            case 'pollEvents':
                this.getEvents();
        }
    }

    createInvoice(props) {
        const form = props.viewData.cardForm;
        const template = props.integration.invoiceTemplate;
        const initParams = props.initParams;
        props.actions.invoiceActions.createInvoice(
            props.appConfig.capiEndpoint,
            initParams.invoiceTemplateID,
            initParams.invoiceTemplateAccessToken,
            {
                amount: toNumber(form.amount.value) * 100,
                currency: 'RUB',
                metadata: template.metadata
            }
        );
    }

    processCardPayment(props) {
        const cardSet = props.viewData.cardForm.cardSet;
        Processing.process({
            invoiceAccessToken: props.payment.accessToken,
            invoiceID: props.integration.invoice.id,
            capiEndpoint: props.appConfig.capiEndpoint,
            cardHolder: cardSet.cardHolder.value,
            cardNumber: cardSet.cardNumber.value,
            cardExpire: cardSet.cardExpire.value,
            cardCvv: cardSet.cardCvv.value,
            email: props.viewData.cardForm.email.value
        })
            .then(event => this.handleEvent(event))
            .catch(error => this.handleError(error));
    }

    getEvents() {
        EventPoller.pollEvents(
            this.props.appConfig.capiEndpoint,
            this.props.integration.invoice.id,
            this.props.payment.accessToken
        )
            .then((event) => this.handleEvent(event))
            .catch(error => this.handleError(error));
    }

    triggerError() {
        this.setState({error: true});
        setTimeout(() => this.setState({error: false}), 500);
    }

    handleEvent(event) {
        if (event.type === 'unpaid') {
            return;
        } else if (event.type === 'interact') {
            this.handleInteract(event);
        } else if (event.type === 'success') {
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

    pay(e) {
        // TODO fix it
        e.preventDefault();
        if (this.props.back) {
            return;
        }
        const form = this.props.viewData.cardForm;
        this.props.actions.viewDataActions.validateForm(form);
        this.props.actions.paymentActions.start();
    }

    renderPayform() {
        const form = 'payform';
        const applePayCapability = this.props.paymentCapabilities.applePay;
        const status = this.props.payment.status;
        return (
            <form
                className={cx('payform--form', {_error: this.state.error})}
                id={form}
                role="form"
                onSubmit={this.pay}
                noValidate>
                {
                    applePayCapability !== 'unknown' ? <Fieldset/> : false
                }
                {
                    status === 'error' ? <ErrorPanel/> : false
                }
                {
                    applePayCapability === 'capable'
                        ? <button className="apple-pay-button visible" form={form}/>
                        : false
                }
                {
                    applePayCapability === 'unavailable'
                        ? (this.state.back
                        ? <BackButton locale={this.props.locale}/>
                        : <PayButton
                            form={form}
                            checkmark={status === 'finished'}
                            spinner={status === 'processInvoiceTemplate' || status === 'processPayment'}/>) : false
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
        payment: state.payment,
        paymentCapabilities: state.paymentCapabilities
    };
}

function mapActionsToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch),
            invoiceActions: bindActionCreators(invoiceActions, dispatch),
            resultActions: bindActionCreators(resultActions, dispatch),
            paymentActions: bindActionCreators(paymentActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapActionsToProps)(Payform);
