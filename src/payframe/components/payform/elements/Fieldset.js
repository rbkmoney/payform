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
        this.handleAmount = this.handleAmount.bind(this);
    }

    handleAmount(value) {
        if (this.props.template && this.props.template.cost.invoiceTemplateCostType === 'InvoiceTemplateCostRange') {
            this.setPayformState(this.assignRange(this.state.amount, {
                value,
                range: this.props.template.cost.range
            }), 'amount');
        } else {
            this.setPayformState(this.assignValue(this.state.amount, value), 'amount');
        }
    }

    assignRange(prop, value) {
        return Object.assign(prop, value);
    }

    assignValue(prop, value) {
        return Object.assign(prop, {value});
    }

    setPayformState(data, name) {
        this.setState({
            [name]: data
        });
    }

    render() {
        // const amount = this.state.amount;
        const email = this.props.viewData.cardForm.email;
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
                    this.props.isAmount ?
                        <fieldset className="payform--fieldset">
                            <Amount
                                onChange={this.handleAmount}
                                value={amount.value}
                                isValid={amount.isValid}
                                locale={this.props.locale}
                                currency={this.props.currency}
                                template={this.props.template}
                            />
                        </fieldset>
                        : false
                }
            </span>
        );
    }
}

function mapState(state) {
    return {
        locale: state.locale,
        viewData: state.viewData
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
