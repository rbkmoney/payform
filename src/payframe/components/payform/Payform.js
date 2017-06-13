import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import cx from 'classnames';
import CardHolder from './elements/CardHolder';
import CardNumber from './elements/CardNumber';
import CardExpire from './elements/CardExpire';
import CardCvv from './elements/CardCvv';
import Email from './elements/Email';
import ErrorPanel from './elements/ErrorPanel';
import PayformValidation from './PayformValidation';
import PayButton from './elements/PayButton';
import BackButton from './elements/BackButton';
import Processing from '../../backend-communication/Processing';
import settings from '../../../settings';
import isMobile from 'ismobilejs';
import Form3ds from '../../interaction/Form3ds';
import EventPoller from '../../backend-communication/EventPoller';

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
            payformState: {
                cardHolder: {value: ''},
                cardNumber: {value: ''},
                cardExpire: {value: ''},
                cardCvv: {value: ''},
                email: {value: ''}
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

        this.handleCardHolder = this.handleCardHolder.bind(this);
        this.handleCardNumber = this.handleCardNumber.bind(this);
        this.handleCardExpire = this.handleCardExpire.bind(this);
        this.handleCardCvv = this.handleCardCvv.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.triggerError = this.triggerError.bind(this);
        this.setPayformState = this.setPayformState.bind(this);
        this.pay = this.pay.bind(this);
    }

    handleCardHolder(value) {
        const name = value.toUpperCase();
        this.isShowErrorPanel = false;
        this.setPayformState(Payform.assignValue(this.state.payformState.cardHolder, name), 'cardHolder');
    }

    handleCardNumber(value) {
        this.isShowErrorPanel = false;
        this.setPayformState(Payform.assignValue(this.state.payformState.cardNumber, value), 'cardNumber');
    }

    handleCardExpire(value) {
        this.isShowErrorPanel = false;
        this.setPayformState(Payform.assignValue(this.state.payformState.cardExpire, value), 'cardExpire');
    }

    handleCardCvv(value) {
        this.isShowErrorPanel = false;
        this.setPayformState(Payform.assignValue(this.state.payformState.cardCvv, value), 'cardCvv');
    }

    handleEmail(value) {
        const email = value.toLowerCase();
        this.isShowErrorPanel = false;
        this.setPayformState(Payform.assignValue(this.state.payformState.email, email), 'email');
    }

    setPayformState(data, name) {
        this.setState({
            payformState: Object.assign(this.state.payformState, {
                [name]: data
            })
        })
    }

    triggerError() {
        this.setState({
            error: true
        });

        setTimeout(() => {
            this.setState({
                error: false
            });
        }, 2000)

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
        this.handleCardHolder(e.target['card-holder'].value);
        this.handleCardNumber(e.target['card-number'].value);
        this.handleCardCvv(e.target['cvv'].value);
        this.handleEmail(this.props.defaultEmail ? this.props.defaultEmail : e.target['email'].value);
        this.handleCardExpire(e.target['exp-date'].value);
        const formValidation = new PayformValidation(this.state.payformState);
        const isValid = formValidation.validate();
        this.forceUpdate();
        if (isValid) {
            this.setState({
                payform: true,
                interact: false,
                spinner: true,
                checkmark: false
            });
            const payformState = this.state.payformState;
            Processing.process({
                invoiceAccessToken: this.props.invoiceAccessToken,
                invoiceID: this.props.invoiceID,
                capiEndpoint: this.props.capiEndpoint,
                cardHolder: payformState.cardHolder.value,
                cardNumber: payformState.cardNumber.value,
                cardExpire: payformState.cardExpire.value,
                email: payformState.email.value,
                cardCvv: payformState.cardCvv.value
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
        const payformState = this.state.payformState;
        const cardHolder = payformState.cardHolder;
        const cardNumber = payformState.cardNumber;
        const cardExpire = payformState.cardExpire;
        const cardCvv = payformState.cardCvv;
        const email = payformState.email;
        const form = 'payform';
        return (
            <ReactCSSTransitionGroup
                transitionName='checkout--body'
                transitionAppear={true}
                transitionAppearTimeout={700}
                transitionEnter={false}
                transitionLeave={false}>
                <form className={cx('payform--form', {_error: this.state.error})}
                      id={form} role="form" onSubmit={this.pay}>
                    <fieldset className="payform--fieldset">
                        <CardNumber onChange={this.handleCardNumber} value={cardNumber.value}
                                    isValid={cardNumber.isValid}/>
                        <CardExpire onChange={this.handleCardExpire} value={cardExpire.value}
                                    isValid={cardExpire.isValid}/>
                        <CardCvv onChange={this.handleCardCvv} value={cardCvv.value} isValid={cardCvv.isValid}/>
                    </fieldset>
                    <fieldset className="payform--fieldset">
                        <CardHolder onChange={this.handleCardHolder} value={cardHolder.value}
                                    isValid={cardHolder.isValid}/>
                    </fieldset>
                    {this.props.defaultEmail ? false:
                        <fieldset className="payform--fieldset">
                            <Email onChange={this.handleEmail} value={email.value} isValid={email.isValid}/>
                        </fieldset> }
                    <ErrorPanel visible={this.isShowErrorPanel} message={this.errorMessage}/>
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

    static assignValue(prop, value) {
        return Object.assign(prop, {
            value: value
        });
    }
}

export default Payform;
