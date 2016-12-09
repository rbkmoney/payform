import React from 'react';

class CardCvv extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        const value = this.props.value;
        return <div className="payform--group payform--card-cvc">
            <input id="cvv" type="tel"
                   ref={(input) => { this.input = input; }}
                   value={value}
                   onChange={this.handleChange}
                   placeholder="CVC" autoComplete="off" autoCorrect="no" autoCapitalize="no" spellCheck="no" maxLength="4"/>
        </div>
    }
}

export default CardCvv
