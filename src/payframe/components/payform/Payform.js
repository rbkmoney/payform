import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import cx from 'classnames';
import ErrorPanel from './elements/ErrorPanel';
import PayformValidation from './PayformValidation';
import PayButton from './elements/PayButton';
import BackButton from './elements/BackButton';
import Processing from '../../backend-communication/Processing';
import settings from '../../../settings';
import isMobile from 'ismobilejs';
import Form3ds from '../../interaction/Form3ds';
import EventPoller from '../../backend-communication/EventPoller';
import Fieldset from './elements/Fieldset';

class Payform extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            payform: true,
            interact: false,
            spinner: false,
            checkmark: false,
            back: false,
            fieldsState: {
                cardHolder: {value: ''},
                cardNumber: {value: ''},
                cardExpire: {value: ''},
                cardCvv: {value: ''},
                email: {value: this.props.defaultEmail ? this.props.defaultEmail : ''}
            }
        };

        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                this.setState({
                    payform: true,
                    interact: false,
                    spinner: true,
                    checkmark: false
                });
                this.props.onPayformInteract(false);
                EventPoller.pollEvents(this.props.capiEndpoint, this.props.invoiceID, this.props.invoiceAccessToken)
                    .then((event) => this.handleEvent(event))
                    .catch(error => this.handleError(error));
            }
        });
        this.triggerError = this.triggerError.bind(this);
        this.handleFieldsChange = this.handleFieldsChange.bind(this);
        this.pay = this.pay.bind(this);
    }

    handleFieldsChange(fieldsState) {
        this.setState({fieldsState});
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
        if (event.type === 'success') {
            this.handleSuccess();
        } else if (event.type === 'interact') {
            this.handleInteract(event);
        } else {
            console.error(event);
            throw new Error('Unsupported payment result error');
        }
    }

    handleError(error) {
        this.setState({
            payform: true,
            interact: false,
            spinner: false,
            checkmark: false
        });
        this.errorMessage = error.message;
        this.isShowErrorPanel = true;
        this.triggerError();
        this.forceUpdate();
    }

    handleSuccess() {
        this.setState({
            payform: true,
            interact: false,
            spinner: false,
            checkmark: true
        });
        this.props.onPaymentSuccess();
        if (isMobile.any && history.length > 1) {
            setTimeout(() => {
                this.setState({
                    payform: true,
                    interact: false,
                    spinner: false,
                    checkmark: false,
                    back: true
                })
            }, settings.closeFormTimeout + 100)
        }
    }

    handleInteract(event) {
        this.setState({
            payform: false,
            interact: true,
            spinner: false,
            checkmark: false
        });
        this.props.onPayformInteract(true);
        const form3ds = new Form3ds(event.data, this.props.payformHost, this.refs['3ds']);
        form3ds.submit(settings.submitFormTimeout); // TODO fix it
    }

    pay(e) {
        e.preventDefault();
        if (this.props.back) {
            return;
        }
        this.isShowErrorPanel = false;
        const fieldsState = this.state.fieldsState;
        const formValidation = new PayformValidation(fieldsState);
        const isValid = formValidation.validate();
        this.forceUpdate();
        if (isValid) {
            this.setState({
                payform: true,
                interact: false,
                spinner: true,
                checkmark: false
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
            }).then(event => this.handleEvent(event))
                .catch(error => this.handleError(error));
        } else {
            this.triggerError()
        }
    }

    renderInteract() {
        // TODO fix it
        return (
            <div ref="3ds" className="payform--interact"/>
        );
    }

    renderPayform() {
        const form = 'payform';
        return (
            <ReactCSSTransitionGroup
                transitionName='checkout--body'
                transitionAppear={true}
                transitionAppearTimeout={700}
                transitionEnter={false}
                transitionLeave={false}>
                <form className={cx('payform--form', {_error: this.state.error})}
                      id={form}
                      role="form"
                      onSubmit={this.pay}
                      noValidate>
                    <Fieldset
                        defaultEmail={this.props.defaultEmail}
                        onFieldsChange={this.handleFieldsChange}
                        fieldsState={this.state.fieldsState}/>
                    <ErrorPanel
                        visible={this.isShowErrorPanel}
                        message={this.errorMessage}/>
                    {this.state.back
                        ? <BackButton/>
                        : <PayButton
                            form={form}
                            checkmark={this.state.checkmark}
                            spinner={this.state.spinner}
                            label={this.props.payButtonLabel}
                            amount={this.props.amount}
                            currency={this.props.currency}
                        />}
                </form>
            </ReactCSSTransitionGroup>
        );
    }

    render() {
        return (
            <div className="payform">
                { this.state.payform ? this.renderPayform() : false }
                { this.state.interact ? this.renderInteract() : false }
            </div>
        );
    }
}

export default Payform;
