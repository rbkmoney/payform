import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewDataActions from '../../../redux/actions/viewDataActions';
import CardForm from './cardForm/CardForm';
import ApplePayForm from './applePayForm/ApplePayForm';

class CardPayment extends React.Component {

    componentDidMount() {
        if (this.props.paymentCapabilities.applePay === 'capable') {
            this.props.actions.viewDataActions.setActiveForm('applePayForm');
        }
    }

    render() {
        const activeForm = this.props.viewData.activeForm;
        return (
            <div>
                {
                    activeForm === 'cardForm' ? <CardForm/> : false
                }
                {
                    activeForm === 'applePayForm' ? <ApplePayForm/> : false
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        paymentCapabilities: state.paymentCapabilities,
        viewData: state.viewData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPayment);
