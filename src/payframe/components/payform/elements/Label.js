import React from 'react';
import formatCurrency from '../../../../utils/formatCurrency';

class Label extends React.Component {

    getLabel(locale) {
        switch (locale) {
            case 'ru':
                return 'Оплатить';
            case 'en':
            default:
                return 'Pay';
        }
    }

    render() {
        const props = this.props;
        return (
            this.props.visible &&
            <div>
                <span className="payform--pay-button--label">
                    {props.label ? props.label : this.getLabel(this.props.locale['locale'])}
                </span>&nbsp;
                <span>
                    {formatCurrency(props.amount, props.currency)}
                </span>
            </div>
        );
    }
}

export default Label;
