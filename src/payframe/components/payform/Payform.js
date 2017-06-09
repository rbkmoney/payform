import React from 'react';
import cx from 'classnames';
import Spinner from '../Spinner';
import Checkmark from '../Checkmark';
import CardHolder from './elements/CardHolder';
import CardNumber from './elements/CardNumber';
import CardExpire from './elements/CardExpire';
import CardCvv from './elements/CardCvv';
import Email from './elements/Email';
import ErrorPanel from './elements/ErrorPanel';
import PayformValidation from './PayformValidation';

class Payform extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false
        };

        this.handleCardHolder = this.handleCardHolder.bind(this);
        this.handleCardNumber = this.handleCardNumber.bind(this);
        this.handleCardExpire = this.handleCardExpire.bind(this);
        this.handleCardCvv = this.handleCardCvv.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.triggerError = this.triggerError.bind(this);
        this.pay = this.pay.bind(this);
    }

    componentWillUpdate(props) {
        this.isShowErrorPanel = props.isShowErrorPanel;
        this.isPayButtonDisabled = props.isPayButtonDisabled;
        this.errorMessage = props.errorMessage;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShowErrorPanel) {
            this.triggerError();
        }
    }

    handleCardHolder(value) {
        const name = value.toUpperCase();
        this.props.setShowErrorPanel(false);
        this.props.setPayformState(Payform.assignValue(this.props.payformState.cardHolder, name), 'cardHolder');
    }

    handleCardNumber(value) {
        this.props.setShowErrorPanel(false);
        this.props.setPayformState(Payform.assignValue(this.props.payformState.cardNumber, value), 'cardNumber');
    }

    handleCardExpire(value) {
        this.props.setShowErrorPanel(false);
        this.props.setPayformState(Payform.assignValue(this.props.payformState.cardExpire, value), 'cardExpire');
    }

    handleCardCvv(value) {
        this.props.setShowErrorPanel(false);
        this.props.setPayformState(Payform.assignValue(this.props.payformState.cardCvv, value), 'cardCvv');
    }

    handleEmail(value) {
        const email = value.toLowerCase();
        this.props.setShowErrorPanel(false);
        this.props.setPayformState(Payform.assignValue(this.props.payformState.email, email), 'email');
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
        const props = this.props;
        const formValidation = new PayformValidation(props.payformState);
        const isValid = formValidation.validate();
        this.forceUpdate();
        if (isValid) {
            this.props.handlePay();
        } else {
            this.triggerError()
        }
    }

    goBack() {
        history.go(-history.length + 1);
    }

    render() {
        const props = this.props;
        const cardHolder = props.payformState.cardHolder;
        const cardNumber = props.payformState.cardNumber;
        const cardExpire = props.payformState.cardExpire;
        const cardCvv = props.payformState.cardCvv;
        const email = props.payformState.email;
        return (
            <form className={cx('payform--form', {
                _error: this.state.error
            })} id="payform" role="form" ref={(form) => { this.formElement = form; }} onSubmit={this.pay} noValidate>
                <fieldset className="payform--fieldset">
                    <CardNumber onChange={this.handleCardNumber} value={cardNumber.value} isValid={cardNumber.isValid}/>
                    <CardExpire onChange={this.handleCardExpire} value={cardExpire.value} isValid={cardExpire.isValid}/>
                    <CardCvv onChange={this.handleCardCvv} value={cardCvv.value} isValid={cardCvv.isValid}/>
                </fieldset>
                <fieldset className="payform--fieldset">
                    <CardHolder onChange={this.handleCardHolder} value={cardHolder.value} isValid={cardHolder.isValid}/>
                </fieldset>
                {this.props.defaultEmail ?
                    false
                    :
                    <fieldset className="payform--fieldset">
                        <Email onChange={this.handleEmail} value={email.value} isValid={email.isValid}/>
                    </fieldset>
                }
                <ErrorPanel isShow={this.isShowErrorPanel} message={this.errorMessage}/>
                <button className={cx('payform--pay-button', {
                    _success: this.props.checkmark || this.props.back
                })}
                        type="submit"
                        form="payform"
                        disabled={this.isPayButtonDisabled || this.props.spinner || this.props.checkmark}
                        onClick={this.props.back ? this.goBack : false}
                >
                    { this.props.spinner ? <Spinner /> : false }
                    { this.props.checkmark ? <Checkmark /> : false }
                    { !this.props.spinner && !this.props.checkmark && !this.props.back ?
                            <div><span className="payform--pay-button--label">{this.props.payButtonLabel ? this.props.payButtonLabel : 'Оплатить'}</span> <span>{this.props.amount} {this.props.currency}</span></div>
                        :
                            false
                    }
                    { this.props.back ? 'Назад' : false }
                </button>
            </form>
        );
    }

    static assignValue(prop, value) {
        return Object.assign(prop, {
            value: value
        });
    }
}

export default Payform;
