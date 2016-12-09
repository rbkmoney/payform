import React from 'react';


class Email extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
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
