import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appearanceActions from '../../../redux/actions/appearanceActions';
import * as invoiceActions from '../../../redux/actions/invoiceActions';
import * as processActions from '../../../redux/actions/processActions';
import cx from 'classnames';
import isMobile from 'ismobilejs';
import ErrorPanel from './elements/ErrorPanel';
import PayformValidation from './PayformValidation';
import PayButton from './elements/PayButton';
import BackButton from './elements/BackButton';
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
            invoiceID: props.invoiceID,
            invoiceAccessToken: props.invoiceAccessToken,
            interactionData: {},
            fieldsState: {
                cardHolder: { value: '', },
                cardNumber: { value: '', },
                cardExpire: { value: '', },
                cardCvv: { value: '', },
                email: { value: this.props.defaultEmail ? this.props.defaultEmail : '', },
                amount: {
                    value: '',
                    isRequired: false
                }
            }
        };

        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                this.setState({
                    payment: 'process'
                });
                this.props.actions.appearanceActions.updateAppearance('largeContainer', false);
                this.getEvents();
            }
        });
        this.triggerError = this.triggerError.bind(this);
        this.handleFieldsChange = this.handleFieldsChange.bind(this);
        this.pay = this.pay.bind(this);
        this.handleProcess = this.handleProcess.bind(this);
    }

    componentDidMount() {
        switch (this.props.config.integrationType) {
            case 'default':
                this.getEvents();
                break;
        }
    }

    componentWillReceiveProps(props) {
        if (props.process) {
            this.handleEvent(props.process);
        } else if (props.invoice && props.invoiceTemplate) {
            const fieldsState = this.state.fieldsState;
            const formValidation = new PayformValidation(fieldsState);
            const isValid = formValidation.validate();
            this.forceUpdate();
            this.handleProcess(isValid, fieldsState);
        }
    }

    getEvents() {
        EventPoller.pollEvents(this.props.config.capiEndpoint, this.props.invoice.invoice.id, this.props.data.invoiceAccessToken || this.props.invoice.invoiceAccessToken, this.props.locale)
            .then((event) => this.handleEvent(event))
            .catch(error => this.handleError(error));
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
            this.handleError({ message: event.message });
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
            interactionData: event.data,
            invoiceID: event.invoiceID,
            invoiceAccessToken: event.invoiceAccessToken
        });
        this.props.actions.appearanceActions.updateAppearance('largeContainer', true);
    }

    handleProcess(isValid, fieldsState) {
        if (isValid) {
            this.setState({
                payment: 'process'
            });
            if (this.props.invoice) {
                this.props.actions.processActions.process({
                    invoiceID: this.props.invoice.invoice.id,
                    invoiceAccessToken: this.props.data.invoiceAccessToken,
                    capiEndpoint: this.props.config.capiEndpoint,
                    cardHolder: fieldsState.cardHolder.value,
                    cardNumber: fieldsState.cardNumber.value,
                    cardExpire: fieldsState.cardExpire.value,
                    email: fieldsState.email.value,
                    cardCvv: fieldsState.cardCvv.value,
                }, this.props.locale);
            } else if (this.props.invoiceTemplate) {
                this.props.actions.processActions.process({
                    invoiceTemplate: this.props.invoiceTemplate,
                    invoiceTemplateAccessToken: this.props.data.invoiceTemplateAccessToken,
                    capiEndpoint: this.props.config.capiEndpoint,
                    amount: this.props.invoiceTemplate && this.props.invoiceTemplate.cost.amount ? this.props.invoiceTemplate.cost.amount : fieldsState.amount.value * 100,
                    currency: this.getCurrency()
                }, this.props.locale, this.props.invoiceTemplate);
            }
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
        this.handleProcess(isValid, fieldsState);
    }

    getAmount() {
        if (this.props.invoice) {
            return this.props.invoice.invoice.amount;
        } else if (this.props.invoiceTemplate) {
            return this.props.invoiceTemplate.cost.amount;
        }
    }

    getCurrency() {
        if (this.props.invoice) {
            return this.props.invoice.invoice.currency;
        } else if (this.props.invoiceTemplate && this.props.invoiceTemplate.cost.currency) {
            return this.props.invoiceTemplate.cost.currency;
        } else {
            return settings.defaultCurrency;
        }
    }

    renderPayform() {
        const form = 'payform';
        const isAmount = this.props.invoiceTemplate ? this.props.invoiceTemplate.cost.invoiceTemplateCostType !== 'InvoiceTemplateCostFixed' : false;

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
                    isAmount={isAmount}
                    currency={this.getCurrency()}
                    template={this.props.invoiceTemplate}
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
                        amount={this.getAmount()}
                        currency={this.getCurrency()}
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
                    ? <Interaction interactionData={this.state.interactionData} host={this.props.config.payformHost}/>
                    : this.renderPayform()
                }
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        config: state.config,
        locale: state.locale,
        invoice: state.invoice,
        invoiceTemplate: state.invoiceTemplate,
        data: state.data,
        process: state.process
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            appearanceActions: bindActionCreators(appearanceActions, dispatch),
            invoiceActions: bindActionCreators(invoiceActions, dispatch),
            processActions: bindActionCreators(processActions, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payform);
