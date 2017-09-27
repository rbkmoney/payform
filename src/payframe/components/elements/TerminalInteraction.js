import React from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import formatCurrency from '../../../utils/formatCurrency';

class TerminalInteraction extends React.Component {

    formatPaymentID(paymentID) {
        return paymentID.split('').map((character, index) => {
            if (index % 3 === 1) {
                return ` ${character}`;
            } else {
                return character;
            }
        }).join('');
    }

    render() {
        const locale = this.props.locale;

        return (
            <div className="print-receipt__container">
                <div className="print-receipt__panel pseudo">
                    <div className="panel-body">
                        <dl>
                            <dt>
                                {locale['receipt.pay.in.store']} "{locale['Euroset']}"
                            </dt>
                        </dl>
                        <dl>
                            <dt>{locale['receipt.number']}:</dt>
                            <dd>{this.formatPaymentID(this.props.interactionData.shortPaymentID)}</dd>
                        </dl>
                        <dl>
                            <dt>{locale['receipt.amount']}:</dt>
                            <dd>{formatCurrency(this.props.integration.invoice.amount / 100, this.props.integration.invoice.currency)}</dd>
                        </dl>
                        <dl>
                            <dt>{locale['receipt.dueDate']}:</dt>
                            <dd>{format(this.props.interactionData.dueDate, 'D.MM.YYYY HH:mm')}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        integration: state.integration,
        locale: state.locale
    };
}

export default connect(mapStateToProps)(TerminalInteraction);
