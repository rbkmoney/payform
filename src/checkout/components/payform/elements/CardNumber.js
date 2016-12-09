import React from 'react';
import CardUtils from '../../../../utils/card-utils/CardUtils';

class CardNumber extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    componentDidMount() {
        CardUtils.formatCardNumber(this.input);
        const classList = this.input.parentNode.classList;
        const className = 'payform--field__focus';
        this.input.onfocus = () => classList.add(className);
        this.input.onblur = () => classList.remove(className);
    }

    render() {
        const value = this.props.value;
        return <div className="payform--group payform--card-number">
            <input id="card-number" type="tel"
                   ref={(input) => { this.input = input; }}
                   value={value}
                   onChange={this.handleChange}
                   placeholder="Card number" autoComplete="off" autoCorrect="no" autoCapitalize="no" spellCheck="no"/>
        </div>
    }
}

export default CardNumber;
