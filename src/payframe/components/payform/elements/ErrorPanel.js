import React from 'react';
import { connect } from 'react-redux';

class ErrorPanel extends React.Component {

    constructor(props) {
        super(props);
        this.getMessage = this.getMessage.bind(this);
    }

    getMessage() {
        const error = this.props.payment.paymentError;
        let result;
        if (error.code && this.props.locale[error.code]) {
            result = this.props.locale[error.code];
        } else if (error.message) {
            result = error.message;
        } else {
            result = this.props.locale['Unknown Failure'];
        }
        return result;
    }

    render() {
        return (<div className="payform--error-panel">{this.getMessage()}</div>);
    }
}

function mapStateToProps(state) {
    return {
        locale: state.locale,
        payment: state.payment
    };
}

export default connect(mapStateToProps)(ErrorPanel);
