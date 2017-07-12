import React from 'react';
import Overlay from './Overlay';
import Modal from './Modal';
import MessageModal from './MessageModal';

import LocaleLoader from '../loaders/LocaleLoader';
import Invoice from '../backend-communication/Invoice';
import InvoiceTemplate from '../backend-communication/InvoiceTemplate';


export default class Payframe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            error: {},
            status: 'process'
        };

        this.createInvoice = this.createInvoice.bind(this);
        this.getInvoice = this.getInvoice.bind(this);
        this.getInvoiceTemplate = this.getInvoiceTemplate.bind(this);
    }

    componentDidMount() {
        LocaleLoader.load(this.props.data.locale).then((locale) => {
            this.setState({
                locale
            });

            if (this.props.data.invoiceID && this.props.data.invoiceAccessToken) {
                this.getInvoice(this.props.config.capiEndpoint, this.props.data.invoiceID, this.props.data.invoiceAccessToken);
            } else if (this.props.data.invoiceTemplateID) {
                this.getInvoiceTemplate();
            }
        });
    }

    createInvoice(capiEndpoint, invoiceParamsType, templateID, amount, currency, metadata) {
        return Invoice.createInvoice(capiEndpoint, invoiceParamsType, templateID, amount, currency, metadata)
            .then((response) => {
                const data = Object.assign(this.state.data, {
                    invoiceID: response.invoice.id,
                    invoiceAccessToken: response.invoiceAccessToken.payload
                });
                this.setState({
                    data,
                    template: undefined,
                    status: 'ready'
                });
            })
            .catch((error) => {
                this.setState({
                    error,
                    status: 'error'
                });
            });
    }

    getInvoice(capiEndpoint, invoiceID, invoiceAccessToken) {
        const locale = this.state.locale;
        Invoice.getInvoice(capiEndpoint, invoiceID, invoiceAccessToken)
            .then((invoice) => {
                switch (invoice.status) {
                    case 'unpaid':
                        this.setState({
                            invoice,
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

    getInvoiceTemplate() {
        const locale = this.state.locale;
        InvoiceTemplate.getInvoiceTemplate(this.props.config.capiEndpoint, this.props.data.invoiceTemplateID)
            .then((template) => {
                if (template.cost.invoiceTemplateCostType === 'InvoiceTemplateCostFixed') {
                    return this.createInvoice(this.props.config.capiEndpoint, 'InvoiceParamsWithTemplate', template.id, template.cost.amount, template.cost.currency, template.metadata);
                } else if (template.cost.invoiceTemplateCostType === 'InvoiceTemplateCostRange') {
                    this.setState({
                        template,
                        status: 'ready'
                    });
                } else {
                    this.setState({
                        error: { message: locale['Unknown Failure'] },
                        status: 'error'
                    });
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
        const data = this.state.data;
        return (
            <Modal
                capiEndpoint={this.props.config.capiEndpoint}
                payformHost={this.props.payformHost}

                invoiceAccessToken={data.invoiceAccessToken}
                invoiceID={data.invoiceID}
                defaultEmail={data.email}
                logo={data.logo}
                name={data.name}
                description={data.description}
                popupMode={data.popupMode}
                payButtonLabel={data.payButtonLabel}

                amount={this.state.invoice ? this.state.invoice.amount / 100 : undefined}
                currency={this.state.invoice ? this.state.invoice.currency : undefined}

                locale={this.state.locale}

                template={this.state.template}

                setCheckoutDone={this.props.setCheckoutDone}
                setClose={this.props.setClose}
                createInvoice={this.createInvoice}
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