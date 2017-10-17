import React from 'react';
import formatCurrency from '../../../utils/formatCurrency';

class Label extends React.Component {
    getLabel() {
        let label;
        switch (this.props.integration.type) {
            case 'default':
            case 'template':
                label = 'button.pay.label';
                break;
            case 'customer':
                label = 'button.subscribe.label';
                break;
        }
        return this.props.label ? this.props.label : this.props.locale[label];
    }

    render() {
        const props = this.props;
        return (
            this.props.visible &&
            <div>
                <span className="payform--pay-button--label">
                    {this.getLabel()}
                </span>&nbsp;
                {props.amount && props.currency ?
                    <span>
                        {formatCurrency(props.amount / 100, props.currency)}
                    </span>
                :
                    false
                }
            </div>
        );
    }
}

export default Label;
