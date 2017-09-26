import React from 'react';

class BackButton extends React.Component {

    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        history.go(-history.length + 1);
    }

    render() {
        return (
            <button type="button" className="payform--pay-button _success" onClick={this.goBack}>
                {this.props.locale['button.back']}
            </button>
        );
    }
}

export default BackButton;
