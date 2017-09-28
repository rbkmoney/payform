import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewDataActions from '../../../actions/viewDataActions';

class GoToCard extends React.Component {

    constructor(props) {
        super(props);
        this.goToCard = this.goToCard.bind(this);
    }

    goToCard() {
        this.props.actions.viewDataActions.setActiveForm({activeForm: 'cardForm', paymentMethod: 'BankCard'});
        this.props.actions.viewDataActions.setPreviousForm({activeForm: 'applePayForm', paymentMethod: 'BankCard'});
    }

    render() {
        return (
            <div className="payform--go-to-card">
                <div
                    className="payform--go-to-card--text">{this.props.locale['form.apple.pay.go.to.card.separator']}</div>
                <a className="payform--go-to-card--link"
                   onClick={this.goToCard}>{this.props.locale['form.apple.pay.go.to.card.link']}</a>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        locale: state.locale
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoToCard);
