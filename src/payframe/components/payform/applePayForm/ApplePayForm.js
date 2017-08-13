import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import * as viewDataActions from '../../../../redux/actions/viewDataActions';
import * as invoiceActions from '../../../../redux/actions/invoiceActions';
import * as resultActions from '../../../../redux/actions/resultActions';
import * as paymentActions from '../../../../redux/actions/paymentActions';
import BackButton from '../elements/BackButton';
import ErrorPanel from '../elements/ErrorPanel';
import Email from '../elements/Email';
import Amount from '../elements/Amount';
import GoToCard from './GoToCard';
import Processing from '../../../backend-communication/Processing';
import getWrapperFromInvoice from './getWrapperFromInvoice';
import getWrapperFromInvoiceTemplate from './getWrapperFromInvoiceTemplate';

class ApplePayForm extends React.Component {

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
                this.processApplePayPayment(nextProps);
                break;
        }
    }

    processApplePayPayment(props) {
        this.applePayWrapper.begin().then((result) => {
            console.log('Apple pay token', result);
            // TODO fix after real apple pay payments api capability
            Processing.process({
                invoiceAccessToken: props.payment.accessToken,
                invoiceID: props.integration.invoice.id,
                capiEndpoint: props.appConfig.capiEndpoint,
                cardHolder: 'APPLE PAY PAYER',
                cardNumber: '4242424242424242',
                cardExpire: '12/20',
                cardCvv: '123',
                email: props.viewData.cardForm.email.value
            })
                .then((event) => this.handleEvent(event))
                .catch((error) => this.handleError(error));
        }).catch((error) => {
            this.props.actions.paymentActions.setPaymentError(error);
        });
    }

    handleEvent(event) {
        if (event.type === 'success') {
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

    render() {
        const form = 'apple-pay-form';
        const cardForm = this.props.viewData.cardForm;
        const email = cardForm.email;
        const amount = cardForm.amount;
        return (
            <div className="payform">
                <form
                    className={cx('payform--form', {_error: this.state.shakeValidation})}
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
                        this.props.payment.status === 'error' ? <ErrorPanel/> : false
                    }
                    {
                        this.state.back
                            ? <BackButton locale={this.props.locale}/>
                            : <button className="payform--apple-pay-button" form={form}/>
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
