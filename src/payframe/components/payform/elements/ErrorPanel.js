import React from 'react';
import { connect } from 'react-redux';

class ErrorPanel extends React.Component {

    componentDidMount() {
        this.message = 'Test'
    }

    render() {
        return (<div className="payform--error-panel">{this.message}</div>);
    }
}

function mapStateToProps(state) {
    return {
        locale: state.locale,
        payment: state.payment
    };
}

export default connect(mapStateToProps)(ErrorPanel);
