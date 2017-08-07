import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewDataActions from '../../../../redux/actions/viewDataActions';
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
        switch (this.props.integration.type) {
            case 'template':
                this.handleTemplate();
                break;
        }
    }

    handleTemplate() {
        const cost = this.props.integration.invoiceTemplate.cost;
        if (cost.invoiceTemplateCostType === 'InvoiceTemplateCostRange') {
            this.props.actions.viewDataActions.setFieldsVisibility({
                amountVisible: true
            });
            this.props.actions.viewDataActions.setAmountType({
                name: 'range',
                lowerBound: cost.range.lowerBound,
                upperBound: cost.range.upperBound
            });
        }
    }

    render() {
        const email = this.props.viewData.cardForm.email;
        const amount = this.props.viewData.cardForm.amount;
        return (
            <span>
                <fieldset className="payform--fieldset">
                    <CardNumber/>
                    <CardExpire/>
                    <CardCvv/>
                </fieldset>
                <fieldset className="payform--fieldset">
                    <CardHolder/>
                </fieldset>
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

function mapState(state) {
    return {
        locale: state.locale,
        viewData: state.viewData,
        integration: state.integration
    };
}

function mapActions(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch)
        }
    };
}

export default connect(mapState, mapActions)(Fieldset);
