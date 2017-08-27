import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import * as viewDataActions from '../../../actions/viewDataActions';
import * as invoiceActions from '../../../actions/invoiceActions';
import * as resultActions from '../../../actions/resultActions';
import * as paymentActions from '../../../actions/paymentActions';
import BackButton from '../elements/BackButton';
import ErrorPanel from '../elements/ErrorPanel';
import Email from '../elements/Email';
import Amount from '../elements/Amount';
import GoToCard from './GoToCard';
import getWrapperFromInvoice from './getWrapperFromInvoice';
import getWrapperFromInvoiceTemplate from './getWrapperFromInvoiceTemplate';
import processApplePayPayment from './processApplePayPayment';

class ApplePayForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shakeValidation: false,
            back: false
        };
        this.triggerError = this.triggerError.bind(this);
        this.pay = this.pay.bind(this);
        this.preventSubmit = this.preventSubmit.bind(this);
    }

    componentDidMount() {
        this.props.actions.viewDataActions.setCardSetRequired(false);
        this.props.actions.viewDataActions.resetValidation();
        this.props.actions.paymentActions.reset();
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.payment.status) {
            case 'started':
                if (nextProps.viewData.cardForm.valid) {
                    const wrapperParam = {
                        validationEndpoint: nextProps.appConfig.applePayMerchantValidationEndpoint,
                        host: nextProps.appConfig.host,
                        merchantID: nextProps.appConfig.applePayMerchantID
                    };
                    switch (nextProps.integration.type) {
                        case 'default':
                            this.applePayWrapper = getWrapperFromInvoice(Object.assign({
                                invoice: nextProps.integration.invoice
                            }, wrapperParam));
                            nextProps.actions.paymentActions.processPayment(nextProps.initParams.invoiceAccessToken);
                            break;
                        case 'template':
                            this.applePayWrapper = getWrapperFromInvoiceTemplate(Object.assign({
                                invoiceTemplate: nextProps.integration.invoiceTemplate,
                                formAmount: nextProps.viewData.cardForm.amount.value
                            }, wrapperParam));
                            nextProps.actions.paymentActions.processInvoiceTemplate();
                            break;
                    }
                } else {
                    nextProps.actions.paymentActions.reset();
                    this.triggerError();
                }
                break;
            case 'processPayment':
                processApplePayPayment(nextProps)
                    .then((event) => this.handleEvent(event))
                    .catch((error) => this.handleError(error));
                break;
        }
    }

    handleEvent(event) {
        if (event.type === 'paid' || event.type === 'processed') {
            this.applePayWrapper.complete();
            this.props.actions.paymentActions.finish();
            this.props.actions.resultActions.setDone();
            this.setState({back: true});
        } else {
            this.handleError({code: 'error.payment.unsupport'});
        }
    }

    handleError(error) {
        this.applePayWrapper.failure();
        this.props.actions.paymentActions.setPaymentError(error);
        this.triggerError();
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

    preventSubmit(e) {
        e.preventDefault();
    }

    render() {
        const cardForm = this.props.viewData.cardForm;
        const email = cardForm.email;
        const amount = cardForm.amount;
        return (
            <div className="payform">
                <form
                    className={cx('payform--form', {_error: this.state.shakeValidation})}
                    id="apple-pay-form"
                    role="form"
                    onSubmit={this.preventSubmit}
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
                        this.props.payment.status === 'error' ? <ErrorPanel/> : false
                    }
                    {
                        this.state.back
                            ? <BackButton locale={this.props.locale}/>
                            : <button type="button" className="payform--apple-pay-button" onClick={this.pay}/>
                    }
                    {
                        this.props.payment.status !== 'finished' ? <GoToCard/> : false
                    }

                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ApplePayForm);
