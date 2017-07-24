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
            error: {},
            status: 'process'
        };

        this.getInvoice = this.getInvoice.bind(this);
    }

    componentDidMount() {
        LocaleLoader.load(this.props.data.locale).then((locale) => {
            this.setState({
                locale
            });

            switch (this.props.integrationType) {
                case 'default':
                    this.getInvoice(this.props.config.capiEndpoint, this.props.data.invoiceID, this.props.data.invoiceAccessToken);
                    break;
                default:
                    this.setState({
                        status: 'ready'
                    });
                    break;
            }
        });
    }

    getInvoice(capiEndpoint, invoiceID, invoiceAccessToken) {
        const locale = this.state.locale;
        Invoice.getInvoice(capiEndpoint, invoiceID, invoiceAccessToken, locale)
            .then((invoice) => {
                switch (invoice.status) {
                    case 'unpaid':
                        this.setState({
                            invoice: {
                                currency: invoice.currency,
                                amount: invoice.amount
                            },
                            status: 'ready'
                        });
                        break;
                    case 'cancelled':
                        this.setState({
                            error: {
                                message: `${locale['error.invoice.cancelled']} ${invoice.reason}`
                            },
                            status: 'error'
                        });
                        break;
                    case 'paid':
                        this.setState({
                            error: {
                                message: locale['error.invoice.paid']
                            },
                            status: 'error'
                        });
                        break;
                }
            })
            .catch((error) => this.setState({ error, status: 'error' }) );
    }

    renderMessageModal() {
        return (
            <MessageModal
                type={this.state.error.type}
                error={this.state.error.message}
                popupMode={this.state.data.popupMode}
                setClose={this.props.setClose}
                locale={this.state.locale}
            />
        );
    }

    renderModal() {
        return (
            <Modal
                capiEndpoint={this.props.config.capiEndpoint}
                payformHost={this.props.payformHost}

                data={this.state.data}

                invoice={this.state.invoice}

                locale={this.state.locale}

                setCheckoutDone={this.props.setCheckoutDone}
                setClose={this.props.setClose}
                integrationType={this.props.integrationType}
            />
        );
    }

    render() {
        return (
            <div>
                <Overlay loader={this.state.status === 'process'} />
                { this.state.status === 'ready' ? this.renderModal() : false }
                { this.state.status === 'error' ? this.renderMessageModal() : false }
            </div>
        );
    }
}
