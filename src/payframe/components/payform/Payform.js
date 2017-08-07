import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

//import InvoiceTemplate from '../../backend-communication/InvoiceTemplate';

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
        // this.handleProcess = this.handleProcess.bind(this);
    }

    componentDidMount() {
        switch (this.props.integration.type) {
            //case 'template':
            //this.getInvoiceTemplate();
            //this.props.actions.invoiceTemplateActions.getInvoiceTemplate(this.props.config.capiEndpoint, this.props.data.invoiceTemplateID, this.props.data.invoiceTemplateAccessToken, this.props.locale);
            //break;
            case 'default':
                this.getEvents();
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        const paymentState = nextProps.payment;
        if (paymentState.status === 'start') {
            if (nextProps.viewData.cardForm.valid) {
                this.props.actions.paymentActions.setStatus('process');
                const form = nextProps.viewData.cardForm;
                Processing.process({
                    invoiceAccessToken: this.props.initParams.invoiceAccessToken,
                    invoiceID: this.props.integration.invoice.id,
                    capiEndpoint: this.props.appConfig.capiEndpoint,
                    cardHolder: form.cardHolder.value,
                    cardNumber: form.cardNumber.value,
                    cardExpire: form.cardExpire.value,
                    email: form.email.value,
                    cardCvv: form.cardCvv.value
                }, this.props.locale)
                    .then(event => this.handleEvent(event))
                    .catch(error => this.handleError(error));
            } else {
                this.props.actions.paymentActions.setStatus('');
                this.triggerError();
            }
        } else if (paymentState.status === 'process') {
            this.setState({
                payment: 'process'
            });
        }
    }

    getEvents() {
        EventPoller.pollEvents(
            this.props.appConfig.capiEndpoint,
            this.props.integration.invoice.id,
            this.props.initParams.invoiceAccessToken,
            this.props.locale
        ).then((event) => this.handleEvent(event))
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

    // handleProcess(isValid, fieldsState) {
    //     if (isValid) {
    //         this.setState({
    //             payment: 'process'
    //         });
    //         Processing.processWithTemplate({
    //             invoiceAccessToken: this.props.initParams.invoiceAccessToken,
    //             invoiceID: this.props.integration.invoice.id,
    //             capiEndpoint: this.props.appConfig.capiEndpoint,
    //             cardHolder: fieldsState.cardHolder.value,
    //             cardNumber: fieldsState.cardNumber.value,
    //             cardExpire: fieldsState.cardExpire.value,
    //             email: fieldsState.email.value,
    //             cardCvv: fieldsState.cardCvv.value,
    //             template: this.state.template,
    //             invoiceTemplateAccessToken: this.props.initParams.invoiceTemplateAccessToken,
    //             amount: this.state.template && this.state.template.cost.amount ? this.state.template.cost.amount : fieldsState.amount.value * 100,
    //             currency: this.getCurrency()
    //         }, this.props.locale, this.state.template)
    //             .then(event => this.handleEvent(event))
    //             .catch(error => this.handleError(error));
    //     } else {
    //         this.triggerError();
    //     }
    // }

    pay(e) {
        e.preventDefault();
        if (this.props.back) {
            return;
        }
        const form = this.props.viewData.cardForm;
        this.props.actions.viewDataActions.validateForm(form);
        this.props.actions.paymentActions.setStatus('start');
    }

    getAmount() {
        if (this.props.integration.type === 'default') {
            return this.props.integration.invoice.amount;
        } else if (this.state.template) {
            return this.state.template.cost.amount;
        }
    }

    getCurrency() {
        if (this.props.integration.type === 'default') {
            return this.props.integration.invoice.currency;
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
                className={cx('payform--form', {_error: this.state.error})}
                id={form}
                role="form"
                onSubmit={this.pay}
                noValidate>
                <Fieldset
                    isAmount={isAmount}
                    currency={this.getCurrency()}
                    template={this.state.template}/>
                <ErrorPanel
                    visible={this.state.payment === 'error'}
                    message={this.state.errorMessage}/>
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
                            locale={this.props.locale}/>
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
