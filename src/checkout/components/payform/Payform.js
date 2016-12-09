import React from 'react';
import CardHolder from './elements/CardHolder';
import CardNumber from './elements/CardNumber';
import CardExpire from './elements/CardExpire';
import CardCvv from './elements/CardCvv';
import Email from './elements/Email';

class Payform extends React.Component {

    constructor() {
        super();
        this.state = {
            cardHolder: '',
            cardNumber: '',
            cardExpire: '',
            cardCvv: '',
            email: ''
        };
        this.handleCardHolder = this.handleCardHolder.bind(this);
        this.handleCardNumber = this.handleCardNumber.bind(this);
        this.handleCardExpire = this.handleCardExpire.bind(this);
        this.handleCardCvv = this.handleCardCvv.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.pay = this.pay.bind(this);
    }

    handleCardHolder(cardHolder) {
        this.setState({cardHolder});
    }

    handleCardNumber(cardNumber) {
        this.setState({cardNumber});
    }

    handleCardExpire(cardExpire) {
        this.setState({cardExpire});
    }

    handleCardCvv(cardCvv) {
        this.setState({cardCvv});
    }

    handleEmail(email) {
        this.setState({email});
    }

    pay() {
        console.log(this.state);
    }

    render() {
        return <form id="payform" role="form">
            <fieldset className="payform--fieldset">
                <CardHolder value={this.state.cardHolder} onChange={this.handleCardHolder}/>
            </fieldset>
            <fieldset className="payform--fieldset">
                <CardNumber value={this.state.cardNumber} onChange={this.handleCardNumber}/>
                <CardExpire value={this.state.cardExpire} onChange={this.handleCardExpire}/>
                <CardCvv value={this.state.cardCvv} onChange={this.handleCardCvv}/>
            </fieldset>
            <fieldset className="payform--fieldset">
                <Email value={this.state.email} onChange={this.handleEmail}/>
            </fieldset>
            <button className="payform--pay-button" type="button" form="payform" onClick={this.pay}>Оплатить</button>
        </form>
    }
}

export default Payform;
