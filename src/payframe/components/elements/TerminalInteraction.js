import React from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';

import formatCurrency from '../../../utils/formatCurrency';

class TerminalInteraction extends React.Component {

    render() {
        return (
            <div className="container-print">
                <div className="panel-dark pseudo">
                    <div className="panel-body">
                        <dl>
                            <dt>Euroset payment ID:</dt>
                            <dd>{this.props.interactionData.shortPaymentID}</dd>
                        </dl>
                        <dl>
                            <dt>Оплатить до:</dt>
                            <dd>{format(this.props.interactionData.dueDate, 'HH:mm D MMMM YYYY', {locale: ruLocale})}</dd>
                        </dl>
                        <dl>
                            <dt>К оплате:</dt>
                            <dd>{formatCurrency(this.props.integration.invoice.amount / 100, this.props.integration.invoice.currency)}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        integration: state.integration
    };
}

export default connect(mapStateToProps)(TerminalInteraction);
