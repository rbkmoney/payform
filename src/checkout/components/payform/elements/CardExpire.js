import React from 'react';

class CardExpire extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        const value = this.props.value;
        return <div className="payform--group payform--card-expire">
            <input id="exp-date" type="tel"
                   ref={(input) => { this.input = input; }}
                   value={value}
                   onChange={this.handleChange}
                   placeholder="MM / YY" autoComplete="off" autoCorrect="no" autoCapitalize="no" spellCheck="no"/>
        </div>
    }
}

export default CardExpire;
