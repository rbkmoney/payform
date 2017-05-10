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
        this.props.setShowErrorPanel(false);
        this.props.setPayformState(Payform.assignValue(this.props.payformState.cardHolder, value), 'cardHolder');
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
        this.props.setShowErrorPanel(false);
        this.props.setPayformState(Payform.assignValue(this.props.payformState.email, value), 'email');
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

    pay() {
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
            })} id="payform" role="form" ref={(form) => { this.formElement = form; }}>
                <fieldset className="payform--fieldset">
                    <CardNumber value={cardNumber.value} onChange={this.handleCardNumber} isValid={cardNumber.isValid}/>
                    <CardExpire value={cardExpire.value} onChange={this.handleCardExpire} isValid={cardExpire.isValid}/>
                    <CardCvv value={cardCvv.value} onChange={this.handleCardCvv} isValid={cardCvv.isValid}/>
                </fieldset>
                <fieldset className="payform--fieldset">
                    <CardHolder value={cardHolder.value} onChange={this.handleCardHolder} isValid={cardHolder.isValid}/>
                </fieldset>
                <fieldset className="payform--fieldset">
                    <Email value={email.value} onChange={this.handleEmail} isValid={email.isValid}/>
                </fieldset>
                <ErrorPanel isShow={this.isShowErrorPanel} message={this.errorMessage}/>
                <button className={cx('payform--pay-button', {
                    _success: this.props.checkmark
                })}
                        type="button"
                        form="payform"
                        onClick={this.pay}
                        disabled={this.isPayButtonDisabled || this.props.spinner}
                >
                    { this.props.spinner ? <Spinner /> : false }
                    { this.props.checkmark ? <Checkmark /> : false }
                    { !this.props.spinner && !this.props.checkmark ? `Оплатить ${this.props.amount} ${this.props.currency}` : false }
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
