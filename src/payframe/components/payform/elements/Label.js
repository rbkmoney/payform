import React from 'react';

class Label extends React.Component {

    render() {
        const props = this.props;
        return (
            this.props.visible &&
            <div>
                <span className="payform--pay-button--label">
                    {props.label ? props.label : 'Оплатить'}
                </span>&nbsp;
                <span>
                    {props.amount} {props.currency}
                </span>
            </div>
        );
    }
}

export default Label;
