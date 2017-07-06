import './app.scss';
import 'core-js/es6/promise';
import 'core-js/es6/object';
import 'core-js/es6/array';
import React from 'react';
import ReactDOM from 'react-dom';
import ready from '../utils/domReady';
import Overlay from './components/Overlay';
import Modal from './components/Modal';
import MessageModal from './components/MessageModal';
import ConfigLoader from './loaders/ConfigLoader';
import LocaleLoader from './loaders/LocaleLoader';
import Invoice from './backend-communication/Invoice';
import Child from '../communication/Child';
import settings from '../settings';
import StateResolver from './StateResolver';

class Payframe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payformHost: this.props.payformHost,
            transport: this.props.transport
        };

        this.modal = this.props.modal;

        this.setClose = this.setClose.bind(this);
        this.setCheckoutDone = this.setCheckoutDone.bind(this);
    }

    componentDidMount() {
        StateResolver.resolve(this.state.transport)
            .then((state) => {
                this.setState({
                    data: state
                });
            });

        ConfigLoader.load()
            .then((config) => {
                this.setState({ config: config });

                return Promise.all([
                    LocaleLoader.load(this.state.data.locale),
                    Invoice.getInvoice(this.state.config.capiEndpoint, this.state.data.invoiceID, this.state.data.invoiceAccessToken)
                ]).then((response) => {
                    this.setState({
                        locale: response[0],
                        invoice: response[1]
                    });
                });
            })
            .catch((error) => { this.setState({ error: error }) });
    }

    setCheckoutDone() {
        setTimeout(() => {
            this.state.transport.emit('payment-done');
            this.state.transport.destroy();
            if (this.state.data.popupMode) {
                if (this.state.data.redirectUrl) {
                    location.replace(this.state.data.redirectUrl);
                } else {
                    window.close();
                }
            }
        }, settings.closeFormTimeout)
    }

    setClose() {
        ReactDOM.unmountComponentAtNode(this.modal);
        setTimeout(() => {
            console.log(this);
            this.state.transport.emit('close');
            this.state.transport.destroy();
            if (this.state.data.popupMode) {
                window.close();
            }
        }, 300);
    }

    renderMessageModal(error) {
        return (
            <MessageModal type={error.type} error={error.message} popupMode={this.state.data.popupMode} setClose={this.state.data.setClose}/>
        );
    }

    renderModal() {
        const data = this.state.data;
        return (
            <Modal
                invoiceAccessToken={data.invoiceAccessToken}
                capiEndpoint={this.state.config.capiEndpoint}
                invoiceID={data.invoiceID}
                defaultEmail={data.email}
                logo={data.logo}
                amount={this.state.invoice.amount / 100}
                currency={this.state.invoice.currency}
                name={data.name}
                description={data.description}
                payformHost={this.state.payformHost}
                setCheckoutDone={this.setCheckoutDone}
                setClose={this.setClose}
                popupMode={data.popupMode}
                payButtonLabel={data.payButtonLabel}
                locale={this.state.locale}
            />
        );
    }

    render() {
        const payformHost = this.state.payformHost;
        const config = this.state.config;
        const data = this.state.data;
        const locale = this.state.locale;
        const transport = this.state.transport;
        const error = this.state.error;

        return (
            <div>
                <Overlay />
                { payformHost && config && data && locale && transport ? this.renderModal() : false }
                { error ? this.renderMessageModal(error) : false }
            </div>
        );
    }
}


ready(function(origin) {
    const modal = document.getElementById('modal');

    const child = new Child();
    child.then((transport) => {
        ReactDOM.render(<Payframe payformHost={origin} transport={transport} modal={modal} />, modal);
    });
});
