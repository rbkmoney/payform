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
        if (this.props.integration.type === 'template') {
            this.handleTemplate();
        }
    }

    handleTemplate() {
        const actions = this.props.actions.viewDataActions;
        const cost = this.props.integration.invoiceTemplate.cost;
        let visible = false;
        switch (cost.invoiceTemplateCostType) {
            case 'InvoiceTemplateCostRange':
                actions.setAmountType({
                    name: 'range',
                    lowerBound: cost.range.lowerBound,
                    upperBound: cost.range.upperBound
                });
                visible = true;
                break;
            case 'InvoiceTemplateCostUnlim':
                actions.setAmountType({
                    name: 'unlim'
                });
                visible = true;
                break;
            case 'InvoiceTemplateCostFixed':
                actions.setAmountType({
                    name: 'fixed'
                });
                actions.setAmountVal(cost.amount / 100);
                break;
        }
        actions.setAmountVisibility(visible);
        actions.setAmountRequired(true);
    }

    render() {
        const activeForm = this.props.viewData.activeForm;
        return (
            <div>
                {
                    activeForm === 'applePayForm' ? <ApplePayForm/> : false
                }
                {
                    activeForm === 'cardForm' ? <CardForm/> : false
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        paymentCapabilities: state.paymentCapabilities,
        viewData: state.viewData,
        integration: state.integration
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
