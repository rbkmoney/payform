import React from 'react';
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
        this.handleCardHolder = this.handleCardHolder.bind(this);
        this.handleCardNumber = this.handleCardNumber.bind(this);
        this.handleCardExpire = this.handleCardExpire.bind(this);
        this.handleCardCvv = this.handleCardCvv.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.pay = this.pay.bind(this);
    }

    componentWillUpdate(props) {
        this.isShowErrorPanel = props.isShowErrorPanel;
        this.isPayButtonDisabled = props.isPayButtonDisabled;
        this.errorMessage = props.errorMessage;
    }

    handleCardHolder(value) {
        this.props.setPayformState(Payform.assignValue(this.props.payformState.cardHolder, value), 'cardHolder');
    }

    handleCardNumber(value) {
        this.props.setPayformState(Payform.assignValue(this.props.payformState.cardNumber, value), 'cardNumber');
    }

    handleCardExpire(value) {
        this.props.setPayformState(Payform.assignValue(this.props.payformState.cardExpire, value), 'cardExpire');
    }

    handleCardCvv(value) {
        this.props.setPayformState(Payform.assignValue(this.props.payformState.cardCvv, value), 'cardCvv');
    }

    handleEmail(value) {
        this.props.setPayformState(Payform.assignValue(this.props.payformState.email, value), 'email');
    }

    pay() {
        const props = this.props;
        const formValidation = new PayformValidation(props.payformState);
        const isValid = formValidation.validate();
        this.forceUpdate();
        if (isValid) {
            this.props.handlePay();
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
            <form id="payform" role="form" ref={(form) => { this.formElement = form; }}>
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
                <button className="payform--pay-button"
                        type="button"
                        form="payform"
                        onClick={this.pay}
                        disabled={this.isPayButtonDisabled}>
                    Оплатить {this.props.amount}{this.props.currency}
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
