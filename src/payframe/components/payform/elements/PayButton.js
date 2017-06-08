import React from 'react';
import cx from 'classnames';
import Spinner from './Spinner';
import Checkmark from './Checkmark';
import Label from './Label';

class PayButton extends React.Component {

    render() {
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
                    amount={props.amount}
                    currency={props.currency}
                />
            </button>
        );
    }
}

export default PayButton;
