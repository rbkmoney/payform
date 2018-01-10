import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewDataActions from '../../actions/viewDataActions';
import CardNumber from './CardNumber';
import CardExpire from './CardExpire';
import CardCvv from './CardCvv';
import CardHolder from './CardHolder';
import Email from './Email';
import Amount from './Amount';

class Fieldset extends React.Component {

    constructor(props) {
        super(props);
        this.handleTemplate = this.handleTemplate.bind(this);
    }

    componentDidMount() {
        if (this.props.integration.type === 'template') {
            this.handleTemplate();
            if (this.props.paymentCapabilities.applePay === 'capable') {
                this.props.actions.viewDataActions.setCardSetVisibility(false);
                this.props.actions.viewDataActions.setCardSetRequired(false);
            }
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
        const cardForm = this.props.viewData.cardForm;
        const cardSet = cardForm.cardSet;
        const email = cardForm.email;
        const amount = cardForm.amount;
        return (
            <span>
                {
                    cardSet.visible ?
                        <fieldset className="payform--fieldset">
                            <CardNumber/>
                            <CardExpire/>
                            <CardCvv/>
                        </fieldset> : false
                }
                {
                    cardSet.visible ?
                        <fieldset className="payform--fieldset">
                            <CardHolder/>
                        </fieldset> : false
                }
                {
                    email.visible ?
                        <fieldset className="payform--fieldset">
                            <Email/>
                        </fieldset> : false
                }
                {
                    amount.visible ?
                        <fieldset className="payform--fieldset">
                            <Amount/>
                        </fieldset> : false
                }
            </span>
        );
    }
}

function mapStateToProps(state) {
    return {
        locale: state.locale,
        viewData: state.viewData,
        integration: state.integration,
        paymentCapabilities: state.paymentCapabilities
    };
}

function mapActionsToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapActionsToProps)(Fieldset);
