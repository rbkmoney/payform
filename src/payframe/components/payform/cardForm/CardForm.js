import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toNumber } from 'lodash';
import cx from 'classnames';
import * as viewDataActions from '../../../../redux/actions/viewDataActions';
import * as invoiceActions from '../../../../redux/actions/invoiceActions';
import * as resultActions from '../../../../redux/actions/resultActions';
import * as paymentActions from '../../../../redux/actions/paymentActions';
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
import Processing from '../../../backend-communication/Processing';
import EventPoller from '../../../backend-communication/EventPoller';
import settings from '../../../../settings';

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
                this.getEvents(this.props.payment.accessToken);
            }
        });
        this.triggerError = this.triggerError.bind(this);
        this.pay = this.pay.bind(this);
    }

    componentDidMount() {
        switch (this.props.integration.type) {
            case 'template':
                this.handleTemplate();
                break;
            case 'default':
                this.getEvents(this.props.initParams.invoiceAccessToken);
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        const paymentActions = nextProps.actions.paymentActions;
        const integration = nextProps.integration;
        switch (nextProps.payment.status) {
            case 'started':
                if (nextProps.viewData.cardForm.valid) {
                    if (integration.type === 'default') {
                        paymentActions.processPayment(nextProps.initParams.invoiceAccessToken);
                    } else if (integration.type === 'template') {
                        paymentActions.processInvoiceTemplate();
                    }
                } else {
                    paymentActions.reset();
                    this.triggerError();
                }
                break;
            case 'processInvoiceTemplate':
                const token = integration.invoiceAccessToken;
                token
                    ? paymentActions.processPayment(token.payload)
                    : this.createInvoice(nextProps);
                break;
            case 'processPayment':
                this.processCardPayment(nextProps);
                break;
            case 'pollEvents':
                this.getEvents(nextProps.payment.accessToken);
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
            .catch((error) => this.handleError(error));
    }

    getEvents(token) {
        EventPoller.pollEvents(
            this.props.appConfig.capiEndpoint,
            this.props.integration.invoice.id,
            token
        )
            .then((event) => this.handleEvent(event))
            .catch(error => this.handleError(error));
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
        e.preventDefault();
        const form = this.props.viewData.cardForm;
        this.props.actions.viewDataActions.validateForm(form);
        this.props.actions.paymentActions.start();
    }

    triggerError() {
        this.setState({shakeValidation: true});
        setTimeout(() => this.setState({shakeValidation: false}), 500);
    }

    handleTemplate() {
        const actions = this.props.actions.viewDataActions;
        const cost = this.props.integration.invoiceTemplate.cost;
        let visible = false;
        switch (cost.invoiceTemplateCostType) {
            case 'InvoiceTemplateCostRange':
                actions.setAmountType({
                    name: 'range',
                    lowerBound: cost.range.lowerBound,
                    upperBound: cost.range.upperBound
                });
                visible = true;
                break;
            case 'InvoiceTemplateCostUnlim':
                actions.setAmountType({
                    name: 'unlim'
                });
                visible = true;
                break;
            case 'InvoiceTemplateCostFixed':
                actions.setAmountType({
                    name: 'fixed'
                });
                actions.setAmountVal(cost.amount / 100);
                break;
        }
        actions.setAmountVisibility(visible);
        actions.setAmountRequired(true);
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
