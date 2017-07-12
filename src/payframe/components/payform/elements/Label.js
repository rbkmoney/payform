import React from 'react';
import formatCurrency from '../../../../utils/formatCurrency';

class Label extends React.Component {
    render() {
        const props = this.props;
        return (
            this.props.visible &&
            <div>
                <span className="payform--pay-button--label">
                    {props.label ? props.label : this.props.locale['button.pay.label']}
                </span>&nbsp;
                {props.amount && props.currency ?
                    <span>
                        {formatCurrency(props.amount, props.currency)}
                    </span>
                :
                    false
                }
            </div>
        );
    }
}

export default Label;
