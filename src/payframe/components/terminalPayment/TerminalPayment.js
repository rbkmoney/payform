import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as viewDataActions from '../../actions/viewDataActions';
import EurosetForm from './eurosetForm/EurosetForm';

class TerminalPayment extends Component {
    render() {
        const activeForm = this.props.viewData.activeForm;

        return(
            <div>
                {
                    activeForm === 'eurosetForm' ? <EurosetForm/> : false
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        //appConfig: state.appConfig,
        //initParams: state.initParams,
        //integration: state.integration,
        viewData: state.viewData,
        //payment: state.payment,
        //paymentCapabilities: state.paymentCapabilities
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch),
            //invoiceActions: bindActionCreators(invoiceActions, dispatch),
            //paymentActions: bindActionCreators(paymentActions, dispatch),
            //errorActions: bindActionCreators(errorActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminalPayment);
