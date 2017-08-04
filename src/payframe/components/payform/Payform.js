import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appearanceActions from '../../../redux/actions/appearanceActions';
import * as invoiceActions from '../../../redux/actions/invoiceActions';
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
//import InvoiceTemplate from '../../backend-communication/InvoiceTemplate';

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
            //case 'template':
                //this.getInvoiceTemplate();
                //this.props.actions.invoiceTemplateActions.getInvoiceTemplate(this.props.config.capiEndpoint, this.props.data.invoiceTemplateID, this.props.data.invoiceTemplateAccessToken, this.props.locale);
                //break;
            case 'default':
                this.getEvents();
                break;
        }
    }

    componentWillReceiveProps(props) {
        console.log(props);
    }

    getEvents() {
        EventPoller.pollEvents(this.props.config.capiEndpoint, this.props.invoice.invoice.id, this.props.data.invoiceAccessToken, this.props.locale)
            .then((event) => this.handleEvent(event))
            .catch(error => this.handleError(error));
    }

    //getInvoiceTemplate() {
    //    InvoiceTemplate.getInvoiceTemplate(this.props.config.capiEndpoint, this.props.data.invoiceTemplateID, this.props.data.invoiceTemplateAccessToken, this.props.locale)
    //        .then((template) => {
    //            this.setState({
    //                template,
    //                fieldsState: Object.assign(this.state.fieldsState, {
    //                    amount: {
    //                        isRequired: template.cost ? template.cost.invoiceTemplateCostType !== 'InvoiceTemplateCostFixed' : true,
    //                        value: ''
    //                    }
    //                })
    //            });
    //        })
    //        .catch((error) => this.handleError(error));
    //}

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
            Processing.processWithTemplate({
                invoiceAccessToken: this.props.data.invoiceAccessToken,
                invoiceID: this.props.invoice.invoice.id,
                capiEndpoint: this.props.config.capiEndpoint,
                cardHolder: fieldsState.cardHolder.value,
                cardNumber: fieldsState.cardNumber.value,
                cardExpire: fieldsState.cardExpire.value,
                email: fieldsState.email.value,
                cardCvv: fieldsState.cardCvv.value,
                template: this.state.template,
                invoiceTemplateAccessToken: this.props.data.invoiceTemplateAccessToken,
                amount: this.state.template && this.state.template.cost.amount ? this.state.template.cost.amount : fieldsState.amount.value * 100,
                currency: this.getCurrency()
            }, this.props.locale, this.state.template)
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
        this.handleProcess(isValid, fieldsState);
    }

    getAmount() {
        if (this.props.invoice) {
            return this.props.invoice.invoice.amount;
        } else if (this.state.template) {
            return this.state.template.cost.amount;
        }
    }

    getCurrency() {
        if (this.props.invoice) {
            return this.props.invoice.invoice.currency;
        } else if (this.state.template && this.state.template.cost.currency) {
            return this.state.template.cost.currency;
        } else {
            return settings.defaultCurrency;
        }
    }

    renderPayform() {
        const form = 'payform';
        const isAmount = this.state.template ? this.state.template.cost.invoiceTemplateCostType !== 'InvoiceTemplateCostFixed' : false;

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
                    template={this.state.template}
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
        invoiceTemplate: state.template,
        data: state.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            appearanceActions: bindActionCreators(appearanceActions, dispatch),
            invoiceActions: bindActionCreators(invoiceActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payform);
