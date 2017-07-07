import React from 'react';
import Overlay from './Overlay';
import Modal from './Modal';
import MessageModal from './MessageModal';

import LocaleLoader from '../loaders/LocaleLoader';
import Invoice from '../backend-communication/Invoice';


export default class Payframe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            status: 'process'
        };
    }

    componentDidMount() {
        return Promise.all([
            LocaleLoader.load(this.props.data.locale),
            Invoice.getInvoice(this.props.config.capiEndpoint, this.props.data.invoiceID, this.props.data.invoiceAccessToken)
        ])
            .then((response) => {
                const locale = response[0];
                const invoice = response[1];

                switch (invoice.status) {
                    case 'unpaid':
                        this.setState({
                            locale,
                            invoice
                        });
                        break;
                    case 'cancelled':
                        this.setState({
                            locale,
                            error: {
                                message: `${locale['error.invoice.cancelled']} ${invoice.reason}`
                            }
                        });
                        break;
                    case 'paid':
                        this.setState({
                            locale,
                            error: {
                                message: locale['error.invoice.paid']
                            }
                        });
                        break;
                }
            })
            .catch((error) => this.setState({ error }) );
    }

    renderMessageModal(error) {
        return (
            <MessageModal
                type={error.type}
                error={error.message}
                popupMode={this.state.data.popupMode}
                setClose={this.state.data.setClose}
            />
        );
    }

    renderModal() {
        const data = this.state.data;
        return (
            <Modal
                invoiceAccessToken={data.invoiceAccessToken}
                capiEndpoint={this.props.config.capiEndpoint}
                invoiceID={data.invoiceID}
                defaultEmail={data.email}
                logo={data.logo}
                amount={this.state.invoice.amount / 100}
                currency={this.state.invoice.currency}
                name={data.name}
                description={data.description}
                payformHost={this.props.payformHost}
                setCheckoutDone={this.props.setCheckoutDone}
                setClose={this.props.setClose}
                popupMode={data.popupMode}
                payButtonLabel={data.payButtonLabel}
                locale={this.state.locale}
            />
        );
    }

    render() {
        const data = this.state.data;
        const locale = this.state.locale;
        const error = this.state.error;
        const isReady = !!data && !!locale && !error;

        return (
            <div>
                <Overlay loader={!isReady || !error} />
                { isReady ? this.renderModal() : false }
                { error ? this.renderMessageModal(error) : false }
            </div>
        );
    }
}