import React from 'react';
import cx from 'classnames';
import isMobile from 'ismobilejs';
import ErrorPanel from './elements/ErrorPanel';
import PayformValidation from './PayformValidation';
import PayButton from './elements/PayButton';
import BackButton from './elements/BackButton';
import Processing from '../../backend-communication/Processing';
import settings from '../../../settings';
import EventPoller from '../../backend-communication/EventPoller';
import Fieldset from './elements/Fieldset';
import Interaction from './elements/Interaction';
import InvoiceTemplate from '../../backend-communication/InvoiceTemplate';

class Payform extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            back: false,
            payment: '',
            errorMessage: '',
            interactionData: {},
            fieldsState: {
                cardHolder: { value: '' },
                cardNumber: { value: '' },
                cardExpire: { value: '' },
                cardCvv: { value: '' },
                email: { value: this.props.defaultEmail ? this.props.defaultEmail : '' },
                amount: { value: '' }
            }
        };

        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                this.setState({
                    payment: 'process'
                });
                this.props.onPayformInteract(false);
                this.getEvents();
            }
        });
        this.triggerError = this.triggerError.bind(this);
        this.handleFieldsChange = this.handleFieldsChange.bind(this);
        this.pay = this.pay.bind(this);
        this.handleProcess = this.handleProcess.bind(this);
    }

    componentDidMount() {
        if (this.props.template) {
            this.getInvoiceTemplate();
        } else {
            this.getEvents();
        }
    }

    getEvents() {
        EventPoller.pollEvents(this.props.capiEndpoint, this.props.invoiceID, this.props.invoiceAccessToken, this.props.locale)
            .then((event) => this.handleEvent(event))
            .catch(error => this.handleError(error));
    }

    getInvoiceTemplate() {
        InvoiceTemplate.getInvoiceTemplate(this.props.config.capiEndpoint, this.props.data.invoiceTemplateID, this.state.locale)
            .then((template) => {
                console.log(template);
            })
            .catch((error) => this.setState({ error, status: 'error' }) );
    }

    handleFieldsChange(fieldsState) {
        this.setState({ fieldsState });
    }

    triggerError() {
        this.setState({
            error: true
        });
        setTimeout(() => {
            this.setState({
                error: false
            });
        }, 500)
    }

    handleEvent(event) {
        if (event.type === 'unpaid') {
            return;
        } else if (event.type === 'interact') {
            this.handleInteract(event);
        } else if (event.type === 'success') {
            this.handleSuccess();
        } else {
            this.handleError({ message: this.props.locale['error.payment.unsupport'] });
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
        this.props.onPaymentSuccess();
        if (isMobile.any && history.length > 1) {
            setTimeout(() => {
                this.setState({
                    back: true
                });
            }, settings.closeFormTimeout + 100)
        }
    }

    handleInteract(event) {
        this.setState({
            payment: 'interact',
            interactionData: event.data
        });
        this.props.onPayformInteract(true);
    }

    handleProcess(isValid, fieldsState) {
        if (isValid) {
            this.setState({
                payment: 'process'
            });
            Processing.process({
                invoiceAccessToken: this.props.invoiceAccessToken,
                invoiceID: this.props.invoiceID,
                capiEndpoint: this.props.capiEndpoint,
                cardHolder: fieldsState.cardHolder.value,
                cardNumber: fieldsState.cardNumber.value,
                cardExpire: fieldsState.cardExpire.value,
                email: fieldsState.email.value,
                cardCvv: fieldsState.cardCvv.value
            }, this.props.locale)
                .then(event => this.handleEvent(event))
                .catch(error => this.handleError(error));
        } else {
            this.triggerError()
        }
    }

    pay(e) {
        e.preventDefault();
        if (this.props.back) {
            return;
        }
        const fieldsState = this.state.fieldsState;
        const formValidation = new PayformValidation(fieldsState);
        const isValid = formValidation.validate();
        this.forceUpdate();
        if (fieldsState.amount.value && isValid) {
            this.props.createInvoice(this.props.capiEndpoint, this.props.template).then(() => {
                this.handleProcess(isValid, fieldsState);
            });
        } else {
            this.handleProcess(isValid, fieldsState);
        }
    }

    renderPayform() {
        const form = 'payform';
        return (
            <form
                className={cx('payform--form', { _error: this.state.error })}
                id={form}
                role="form"
                onSubmit={this.pay}
                noValidate
            >
                <Fieldset
                    defaultEmail={this.props.defaultEmail}
                    onFieldsChange={this.handleFieldsChange}
                    fieldsState={this.state.fieldsState}
                    locale={this.props.locale}
                    template={this.props.template}
                />
                <ErrorPanel
                    visible={this.state.payment === 'error'}
                    message={this.state.errorMessage}
                />
                {
                    this.state.back ?
                    <BackButton locale={this.props.locale}/>
                :
                    <PayButton
                        form={form}
                        checkmark={this.state.payment === 'success'}
                        spinner={this.state.payment === 'process'}
                        label={this.props.payButtonLabel}
                        amount={this.props.amount}
                        currency={this.props.currency}
                        locale={this.props.locale}
                    />
                }
            </form>
        );
    }

    render() {
        return (
            <div className="payform">
                { this.state.payment === 'interact'
                    ? <Interaction interactionData={this.state.interactionData} host={this.props.payformHost}/>
                    : this.renderPayform()
                }
            </div>
        );
    }
}

export default Payform;
