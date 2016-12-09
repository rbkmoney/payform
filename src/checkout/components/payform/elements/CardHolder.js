import React from 'react';

class CardHolder extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        const value = this.props.value;
        return <div className="payform--group payform--card-holder">
            <input id="card-holder" type="text" value={value} onChange={this.handleChange} placeholder="Card holder"
                   autoComplete="off" autoCorrect="no" autoCapitalize="no" spellCheck="no"/>
        </div>
    }
}

export default CardHolder;
