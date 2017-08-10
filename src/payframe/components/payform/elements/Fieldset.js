import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewDataActions from '../../../../redux/actions/viewDataActions';
import CardFieldset from './CardFieldset';
import AppleFieldset from './AppleFieldset';
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
                        ? <AppleFieldset />
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
                        ? <CardFieldset />
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
