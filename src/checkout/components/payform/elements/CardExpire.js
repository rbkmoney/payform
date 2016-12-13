import React from 'react';
import CardUtils from '../../../../utils/card-utils/CardUtils';
import {focusClass, errorClass} from './cssClasses';

class CardExpire extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    componentDidMount() {
        CardUtils.formatCardExpiry(this.input);
        const classList = this.input.parentNode.classList;
        this.input.onfocus = () => classList.add(focusClass);
        this.input.onblur = () => classList.remove(focusClass);
    }

    componentWillReceiveProps(props) {
        const classList = this.input.parentNode.classList;
        if (props.isValid === false) {
            classList.add(errorClass);
        } else {
            classList.remove(errorClass);
        }
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
