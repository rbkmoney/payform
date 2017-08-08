import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toNumber } from 'lodash';
import * as viewDataActions from '../../../redux/actions/viewDataActions';
import * as invoiceActions from '../../../redux/actions/invoiceActions';
import * as resultActions from '../../../redux/actions/resultActions';
import * as paymentActions from '../../../redux/actions/paymentActions';
import cx from 'classnames';
import isMobile from 'ismobilejs';
import ErrorPanel from './elements/ErrorPanel';
import PayButton from './elements/PayButton';
import BackButton from './elements/BackButton';
import Processing from '../../backend-communication/Processing';
import settings from '../../../settings';
import EventPoller from '../../backend-communication/EventPoller';
import Fieldset from './elements/Fieldset';
import Interaction from './elements/Interaction';

class Payform extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            back: false,
            payment: '',
            errorMessage: '',
            interactionData: {}
        };

        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                this.setState({
                    payment: 'process'
                });
                this.props.actions.paymentActions.setStatus('process');
                this.props.actions.viewDataActions.updateContainerSize('default');
                this.getEvents();
            }
        });
        this.triggerError = this.triggerError.bind(this);
        this.pay = this.pay.bind(this);
    }

    componentDidMount() {
        switch (this.props.integration.type) {
            case 'default':
                this.getEvents();
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.payment.status) {
            case 'start':
                if (nextProps.viewData.cardForm.valid) {
                    if (nextProps.integration.type === 'default') {
                        nextProps.actions.paymentActions.setStatus('process');
                        this.processPayment(nextProps, nextProps.initParams.invoiceAccessToken);
                    } else if (nextProps.integration.type === 'template') {
                        this.setState({
                            payment: 'process'
                        });
                        nextProps.actions.paymentActions.setStatus('process-template');
                        this.processTemplate(nextProps);
                    }
                } else {
                    nextProps.actions.paymentActions.setStatus('');
                    this.triggerError();
                }
                break;
            case 'process-template':
                if (nextProps.integration.invoiceAccessToken) {
                    nextProps.actions.paymentActions.setStatus('process');
                    this.processPayment(nextProps, nextProps.integration.invoiceAccessToken.payload);
                }
                break;
            case 'process':
                this.setState({
                    payment: 'process'
                });
                break;
        }
    }

    processTemplate(props) {
        const form = props.viewData.cardForm;
        const template = props.integration.invoiceTemplate;
        const initParams = props.initParams;
        props.actions.invoiceActions.createInvoice(
            props.appConfig.capiEndpoint,
            initParams.invoiceTemplateID,
            initParams.invoiceTemplateAccessToken,
            {
                amount: toNumber(form.amount.value) * 100,
                currency: 'RUB', // TODO fix it
                metadata: template.metadata
            }
        );
    }

    processPayment(props, token) {
        const form = props.viewData.cardForm;
        Processing.process({
            invoiceAccessToken: token,
            invoiceID: props.integration.invoice.id,
            capiEndpoint: props.appConfig.capiEndpoint,
            cardHolder: form.cardHolder.value,
            cardNumber: form.cardNumber.value,
            cardExpire: form.cardExpire.value,
            email: form.email.value,
            cardCvv: form.cardCvv.value
        }, props.locale)
            .then(event => this.handleEvent(event))
            .catch(error => this.handleError(error));
    }

    getEvents() {
        let token;
        if (this.props.integration.type === 'default') {
            token = this.props.initParams.invoiceAccessToken;
        } else if (this.props.integration.type === 'template') {
            token = this.props.integration.invoiceAccessToken.payload;
        }
        EventPoller.pollEvents(
            this.props.appConfig.capiEndpoint,
            this.props.integration.invoice.id,
            token,
            this.props.locale
        ).then((event) => this.handleEvent(event))
            .catch(error => this.handleError(error));
    }

    triggerError() {
        this.setState({
            error: true
        });
        setTimeout(() => {
            this.setState({
                error: false
            });
        }, 500);
    }

    handleEvent(event) {
        if (event.type === 'unpaid') {
            return;
        } else if (event.type === 'interact') {
            this.handleInteract(event);
        } else if (event.type === 'success') {
            this.handleSuccess();
        } else {
            this.handleError({message: this.props.locale['error.payment.unsupport']});
        }
    }

    handleError(error) {
        this.setState({
            payment: 'error',
            errorMessage: error.message
        });
        this.triggerError();
        this.forceUpdate();
    }

    handleSuccess() {
        this.setState({
            payment: 'success'
        });
        this.props.actions.resultActions.setDone();
        if (isMobile.any && history.length > 1) {
            setTimeout(() => {
                this.setState({
                    back: true
                });
            }, settings.closeFormTimeout + 100);
        }
    }

    handleInteract(event) {
        this.setState({
            payment: 'interact',
            interactionData: event.data,
            invoiceID: event.invoiceID,
            invoiceAccessToken: event.invoiceAccessToken
        });
        this.props.actions.paymentActions.setStatus('interact');
        this.props.actions.viewDataActions.updateContainerSize('large');
    }

    pay(e) {
        e.preventDefault();
        if (this.props.back) {
            return;
        }
        const form = this.props.viewData.cardForm;
        this.props.actions.viewDataActions.validateForm(form);
        this.props.actions.paymentActions.setStatus('start');
    }

    renderPayform() {
        const form = 'payform';
        return (
            <form
                className={cx('payform--form', {_error: this.state.error})}
                id={form}
                role="form"
                onSubmit={this.pay}
                noValidate>
                <Fieldset/>
                <ErrorPanel
                    visible={this.state.payment === 'error'}
                    message={this.state.errorMessage}/>
                {
                    this.state.back
                        ? <BackButton locale={this.props.locale}/>
                        : <PayButton
                            form={form}
                            checkmark={this.state.payment === 'success'}
                            spinner={this.state.payment === 'process'}/>
                }
            </form>
        );
    }

    render() {
        return (
            <div className="payform">
                {this.state.payment === 'interact'
                    ? <Interaction
                        interactionData={this.state.interactionData}
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
