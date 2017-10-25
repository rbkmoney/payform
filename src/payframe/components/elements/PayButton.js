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
            const details = integration.invoiceTemplate.details;
            switch (details.templateType) {
                case 'InvoiceTemplateMultiLine':
                    result = this.props.viewData.cardForm.amount.value;
                    break;
                case 'InvoiceTemplateSingleLine':
                    if (details.price.costType === 'InvoiceTemplateLineCostFixed') {
                        result = this.props.viewData.cardForm.amount.value;
                    }
                    break;
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
                    integration={props.integration}
                />
            </button>
        );
    }
}

function mapStateToProps(state) {
    return {
        initParams: state.initParams,
        locale: state.locale,
        integration: state.integration,
        viewData: state.viewData
    };
}

export default connect(mapStateToProps)(PayButton);
