import React from 'react';
import CardNumber from './CardNumber';
import CardExpire from './CardExpire';
import CardCvv from './CardCvv';
import CardHolder from './CardHolder';
import Email from './Email';

class Fieldset extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.fieldsState;
        this.handleCardHolder = this.handleCardHolder.bind(this);
        this.handleCardNumber = this.handleCardNumber.bind(this);
        this.handleCardExpire = this.handleCardExpire.bind(this);
        this.handleCardCvv = this.handleCardCvv.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }

    handleCardHolder(value) {
        const name = value.toUpperCase();
        this.setPayformState(this.assignValue(this.state.cardHolder, name), 'cardHolder');
    }

    handleCardNumber(value) {
        this.setPayformState(this.assignValue(this.state.cardNumber, value), 'cardNumber');
    }

    handleCardExpire(value) {
        this.setPayformState(this.assignValue(this.state.cardExpire, value), 'cardExpire');
    }

    handleCardCvv(value) {
        this.setPayformState(this.assignValue(this.state.cardCvv, value), 'cardCvv');
    }

    handleEmail(value) {
        const email = value.toLowerCase();
        this.setPayformState(this.assignValue(this.state.email, email), 'email');
    }

    assignValue(prop, value) {
        return Object.assign(prop, {value});
    }

    setPayformState(data, name) {
        this.setState({
            [name]: data
        });
        this.props.onFieldsChange(this.state);
    }

    render() {
        const cardHolder = this.state.cardHolder;
        const cardNumber = this.state.cardNumber;
        const cardExpire = this.state.cardExpire;
        const cardCvv = this.state.cardCvv;
        const email = this.state.email;
        return (
            <div>
                <fieldset className="payform--fieldset">
                    <CardNumber onChange={this.handleCardNumber} value={cardNumber.value} isValid={cardNumber.isValid}/>
                    <CardExpire onChange={this.handleCardExpire} value={cardExpire.value} isValid={cardExpire.isValid}/>
                    <CardCvv onChange={this.handleCardCvv} value={cardCvv.value} isValid={cardCvv.isValid}/>
                </fieldset>
                <fieldset className="payform--fieldset">
                    <CardHolder onChange={this.handleCardHolder} value={cardHolder.value} isValid={cardHolder.isValid}/>
                </fieldset>
                {
                    this.props.defaultEmail ? false :
                        <fieldset className="payform--fieldset">
                            <Email onChange={this.handleEmail} value={email.value} isValid={email.isValid}/>
                        </fieldset>
                }
            </div>
        );
    }
}

export default Fieldset;
