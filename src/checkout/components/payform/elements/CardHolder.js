import React from 'react';
import {focusClass, errorClass} from './cssClasses';

class CardHolder extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
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

    handleChange(event) {
        this.props.onChange(event.target.value.toUpperCase());
    }

    render() {
        const value = this.props.value;
        return <div className="payform--group payform--card-holder">
            <input id="card-holder" type="text"
                   ref={(input) => { this.input = input; }}
                   value={value}
                   onChange={this.handleChange}
                   placeholder="Card holder" autoComplete="off" autoCorrect="no" autoCapitalize="no" spellCheck="no"/>
        </div>
    }
}

export default CardHolder;
