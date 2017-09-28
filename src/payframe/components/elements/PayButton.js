import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Spinner from './Spinner';
import Checkmark from './Checkmark';
import Label from './Label';

class PayButton extends React.Component {

    constructor(props) {
        super(props);
        this.getAmount = this.getAmount.bind(this);
    }

    getAmount() {
        let result;
        const integration = this.props.integration;
        if (integration.type === 'default') {
            result = integration.invoice.amount;
        } else if (integration.type === 'template') {
            const cost = integration.invoiceTemplate.cost;
            if (cost.invoiceTemplateCostType === 'InvoiceTemplateCostFixed') {
                result = cost.amount;
            }
        }
        return result;
    }

    render() {
        const props = this.props;
        const currency = 'RUB';
        return (
            <button className={cx('payform--pay-button', {_success: props.checkmark})}
                    type="submit"
                    form={props.form}
                    disabled={props.spinner || props.checkmark}>
                <Spinner visible={props.spinner}/>
                <Checkmark visible={props.checkmark}/>
                <Label
                    visible={!props.spinner && !props.checkmark}
                    amount={this.getAmount()}
                    currency={currency}
                    label={props.initParams.payButtonLabel}
                    locale={props.locale}
                />
            </button>
        );
    }
}

function mapStateToProps(state) {
    return {
        initParams: state.initParams,
        locale: state.locale,
        integration: state.integration
    };
}

export default connect(mapStateToProps)(PayButton);
