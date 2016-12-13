import React from 'react';
import {focusClass, errorClass} from './cssClasses';

class Email extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
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

    render() {
        const value = this.props.value;
        return <div className="payform--group payform--email">
            <input id="email" type="email"
                   ref={(input) => { this.input = input; }}
                   value={value}
                   onChange={this.handleChange}
                   placeholder="Email" autoComplete="email" autoCorrect="no" autoCapitalize="no" spellCheck="no"/>
        </div>
    }

}

export default Email;
