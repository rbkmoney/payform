import React from 'react';
import cx from 'classnames';
import Spinner from './Spinner';
import Checkmark from './Checkmark';
import Label from './Label';

class PayButton extends React.Component {

    render() {
        const amount = this.props.invoice ? this.props.invoice.amount : this.props.amount;
        const props = this.props;
        return (
            <button className={cx('payform--pay-button', {_success: props.checkmark})}
                    type="submit"
                    form={props.form}
                    disabled={props.disabled || props.spinner || props.checkmark}>
                <Spinner visible={props.spinner}/>
                <Checkmark visible={props.checkmark}/>
                <Label
                    visible={!props.spinner && !props.checkmark}
                    amount={amount}
                    currency={this.props.currency}
                    label={props.label}
                    locale={this.props.locale}
                />
            </button>
        );
    }
}

export default PayButton;
