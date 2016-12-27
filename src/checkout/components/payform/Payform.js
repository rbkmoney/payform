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
        this.state = {
            cardHolder: {value: ''},
            cardNumber: {value: ''},
            cardExpire: {value: ''},
            cardCvv: {value: ''},
            email: {value: ''}
        };
        this.handleCardHolder = this.handleCardHolder.bind(this);
        this.handleCardNumber = this.handleCardNumber.bind(this);
        this.handleCardExpire = this.handleCardExpire.bind(this);
        this.handleCardCvv = this.handleCardCvv.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.pay = this.pay.bind(this);
    }

    componentDidMount() {
        Payform.changeVisibility(this.formElement.style, this.props.isShow);
    }

    componentWillUpdate(props) {
        this.isShowErrorPanel = props.isShowErrorPanel;
        this.isPayButtonDisabled = props.isPayButtonDisabled;
        this.errorMessage = props.errorMessage;
        Payform.changeVisibility(this.formElement.style, props.isShow);
    }

    handleCardHolder(value) {
        this.setState(Payform.assignValue(this.state.cardHolder, value));
    }

    handleCardNumber(value) {
        this.setState(Payform.assignValue(this.state.cardNumber, value));
    }

    handleCardExpire(value) {
        this.setState(Payform.assignValue(this.state.cardExpire, value));
    }

    handleCardCvv(value) {
        this.setState(Payform.assignValue(this.state.cardCvv, value));
    }

    handleEmail(value) {
        this.setState(Payform.assignValue(this.state.email, value));
    }

    pay() {
        const state = this.state;
        const formValidation = new PayformValidation(state);
        const isValid = formValidation.validate();
        this.forceUpdate();
        if (isValid) {
            this.props.handlePay({
                cardHolder: state.cardHolder.value,
                cardNumber: state.cardNumber.value,
                cardExpire: state.cardExpire.value,
                email: state.email.value,
                cardCvv: state.cardCvv.value
            });
        }
    }

    render() {
        const state = this.state;
        const cardHolder = state.cardHolder;
        const cardNumber = state.cardNumber;
        const cardExpire = state.cardExpire;
        const cardCvv = state.cardCvv;
        const email = state.email;
        return <form id="payform" role="form" ref={(form) => { this.formElement = form; }}>
            <fieldset className="payform--fieldset">
                <CardHolder value={cardHolder.value} onChange={this.handleCardHolder} isValid={cardHolder.isValid}/>
            </fieldset>
            <fieldset className="payform--fieldset">
                <CardNumber value={cardNumber.value} onChange={this.handleCardNumber} isValid={cardNumber.isValid}/>
                <CardExpire value={cardExpire.value} onChange={this.handleCardExpire} isValid={cardExpire.isValid}/>
                <CardCvv value={cardCvv.value} onChange={this.handleCardCvv} isValid={cardCvv.isValid}/>
            </fieldset>
            <fieldset className="payform--fieldset">
                <Email value={email.value} onChange={this.handleEmail} isValid={email.isValid}/>
            </fieldset>
            <ErrorPanel isShow={this.isShowErrorPanel} message={this.errorMessage}/>
            <button className="payform--pay-button" type="button" form="payform" onClick={this.pay} style={{background: this.props.buttonColor}}
                    disabled={this.isPayButtonDisabled}>Оплатить {this.props.amount}{this.props.currency}
            </button>
        </form>
    }

    static assignValue(prop, value) {
        return Object.assign(prop, {
            value: value
        });
    }

    static changeVisibility(style, isShow) {
        isShow ? style.display = 'block': style.display = 'none';
    }
}

export default Payform;
