import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewDataActions from '../../../../redux/actions/viewDataActions';

class PayMethodSwitcher extends React.Component {
    changeMethod(method) {
        this.props.actions.viewDataActions.setPaymentMethod(method);
    }

    render() {
        return (
            <div className="payform--switcher">
                <div className="payform--switcher--text">
                    {this.props.locale['or']}
                </div>
                <a onClick={this.changeMethod.bind(this, 'card')} className="payform--switcher--button">{this.props.locale['Pay with Card']}</a>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        viewData: state.viewData,
        locale: state.locale
    }
}

function mapActionsToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PayMethodSwitcher);