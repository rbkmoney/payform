import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as localeActions from '../../redux/actions/localeActions';
import * as invoiceActions from '../../redux/actions/invoiceActions';
import * as statusActions from '../../redux/actions/statusActions';
import * as errorActions from '../../redux/actions/errorActions';
import * as invoiceTemplateActions from '../../redux/actions/invoiceTemplates';
import Overlay from './Overlay';
import Modal from './Modal';
import MessageModal from './MessageModal';

class Payframe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: {}
        };
    }

    componentDidMount() {
        this.props.actions.localeActions.getLocale(this.props.data.locale);
        switch (this.props.config.integrationType) {
            case 'default':
                this.props.actions.invoiceActions.getInvoice(this.props.config.capiEndpoint, this.props.data.invoiceID, this.props.data.invoiceAccessToken);
                break;
            case 'template':
                this.props.actions.invoiceTemplateActions.getInvoiceTemplate(this.props.config.capiEndpoint, this.props.data.invoiceTemplateID, this.props.data.invoiceTemplateAccessToken);
                break;
        }
    }

    componentWillReceiveProps(props) {
        const locale = this.props.locale;
        if (props.invoice && props.status !== 'ready' && props.locale) {
            switch (props.invoice.invoice.status) {
                case 'unpaid':
                    this.props.actions.statusActions.setStatus('ready');
                    break;
                case 'cancelled':
                    this.props.actions.errorActions.setError(`${locale['error.invoice.cancelled']} ${props.invoice.invoice.reason}`);
                    this.props.actions.statusActions.setStatus('error');
                    break;
                case 'paid':
                    this.props.actions.errorActions.setError(locale['error.invoice.paid']);
                    this.props.actions.statusActions.setStatus('error');
                    break;
            }
        }
        if (props.locale && props.config.integrationType === 'template') {
            this.props.actions.statusActions.setStatus('ready');
        }
    }

    renderMessageModal() {
        return (
            <MessageModal
                type={this.state.error.type}
                error={this.state.error.message}
                popupMode={this.props.data.popupMode}
                setClose={this.props.setClose}
                locale={this.state.locale}
            />
        );
    }

    renderModal() {
        return (
            <Modal
                setCheckoutDone={this.props.setCheckoutDone}
                setClose={this.props.setClose}
            />
        );
    }

    render() {
        return (
            <div>
                <Overlay loader={this.props.status === 'process'} />
                { this.props.status === 'ready' ? this.renderModal() : false }
                { this.props.status === 'error' ? this.renderMessageModal() : false }
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        config: state.config,
        data: state.data,
        locale: state.locale,
        invoice: state.invoice,
        status: state.status,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            localeActions: bindActionCreators(localeActions, dispatch),
            invoiceActions: bindActionCreators(invoiceActions, dispatch),
            invoiceTemplateActions: bindActionCreators(invoiceTemplateActions, dispatch),
            statusActions: bindActionCreators(statusActions, dispatch),
            errorActions: bindActionCreators(errorActions, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payframe);