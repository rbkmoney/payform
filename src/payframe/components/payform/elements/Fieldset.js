import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
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
        const viewDataActions = this.props.actions.viewDataActions;
        const cost = this.props.integration.invoiceTemplate.cost;
        let visible = false;
        switch (cost.invoiceTemplateCostType) {
            case 'InvoiceTemplateCostRange':
                viewDataActions.setAmountType({
                    name: 'range',
                    lowerBound: cost.range.lowerBound,
                    upperBound: cost.range.upperBound
                });
                visible = true;
                break;
            case 'InvoiceTemplateCostUnlim':
                viewDataActions.setAmountType({
                    name: 'unlim'
                });
                visible = true;
                break;
            case 'InvoiceTemplateCostFixed':
                viewDataActions.setAmountType({
                    name: 'fixed'
                });
                viewDataActions.setAmountVal(cost.amount / 100);
                break;
        }
        viewDataActions.setFieldsVisibility({
            amountVisible: visible
        });
        viewDataActions.setFieldsRequired({
            amountRequired: true
        });
    }

    renderCardFieldset() {
        const email = this.props.viewData.cardForm.email;
        const amount = this.props.viewData.cardForm.amount;

        return (
            <div>
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
            </div>
        );
    }

    renderAppleFieldset() {
        const email = this.props.viewData.cardForm.email;
        const amount = this.props.viewData.cardForm.amount;

        return (
            <div>
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
            </div>
        );
    }

    render() {
        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName="appearLeft"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    component="div"
                >
                    {
                        this.props.viewData.paymentMethod === 'apple'
                        ? this.renderAppleFieldset()
                        : false
                    }
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup
                    transitionName="appearRight"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    component="div"
                >
                    {
                        this.props.viewData.paymentMethod === 'card'
                        ? this.renderCardFieldset()
                        : false
                    }
                </ReactCSSTransitionGroup>
            </div>
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
