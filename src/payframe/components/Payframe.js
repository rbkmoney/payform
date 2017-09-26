import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as localeActions from '../actions/localeActions';
import * as invoiceActions from '../actions/invoiceActions';
import * as errorActions from '../actions/errorActions';
import * as invoiceTemplateActions from '../actions/invoiceTemplateActions';
import * as viewDataActions from '../actions/viewDataActions';
import * as paymentCapabilitiesActions from '../actions/paymentCapabilitiesActions';
import Overlay from './Overlay';
import Modal from './Modal';
import MessageModal from './MessageModal';

class Payframe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'process'
        };
    }

    componentDidMount() {
        this.props.actions.localeActions.getLocale(this.props.initParams.locale);
        this.props.actions.viewDataActions.setDefaultEmail(this.props.initParams.email);
        this.props.actions.paymentCapabilitiesActions.setApplePayCapability(
            this.props.appConfig.applePayMerchantID,
            this.props.initParams.applePayTest
        );
        switch (this.props.integration.type) {
            case 'default':
                this.props.actions.invoiceActions.getInvoice({
                    capiEndpoint: this.props.appConfig.capiEndpoint,
                    invoiceID: this.props.initParams.invoiceID,
                    accessToken: this.props.initParams.invoiceAccessToken
                });
                this.props.actions.paymentCapabilitiesActions.setPaymentCapabilities({
                    capiEndpoint: this.props.appConfig.capiEndpoint,
                    invoiceID: this.props.initParams.invoiceID,
                    accessToken: this.props.initParams.invoiceAccessToken
                });
                break;
            case 'template':
                this.props.actions.invoiceTemplateActions.getInvoiceTemplate({
                    capiEndpoint: this.props.appConfig.capiEndpoint,
                    invoiceTemplateID: this.props.initParams.invoiceTemplateID,
                    accessToken: this.props.initParams.invoiceTemplateAccessToken
                });
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        const localeReady = nextProps.locale;
        let integrationReady;
        switch (nextProps.integration.type) {
            case 'default':
                integrationReady = nextProps.integration.invoice;
                break;
            case 'template':
                integrationReady = nextProps.integration.invoiceTemplate;
                break;
        }
        const applePayCapabilityChecked = nextProps.paymentCapabilities.applePay !== 'unknown';
        if (localeReady && integrationReady && applePayCapabilityChecked) {
            this.setState({status: 'ready'});
        }
        if (nextProps.error && nextProps.locale) {
            this.setState({status: 'error'});
        }
    }

    render() {
        return (
            <div>
                <Overlay loader={this.state.status === 'process'}/>
                {this.state.status === 'ready' ? <Modal/> : false}
                {this.state.status === 'error' ? <MessageModal/> : false}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        appConfig: state.appConfig,
        initParams: state.initParams,
        integration: state.integration,
        paymentCapabilities: state.paymentCapabilities,
        locale: state.locale,
        error: state.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            localeActions: bindActionCreators(localeActions, dispatch),
            invoiceActions: bindActionCreators(invoiceActions, dispatch),
            invoiceTemplateActions: bindActionCreators(invoiceTemplateActions, dispatch),
            errorActions: bindActionCreators(errorActions, dispatch),
            viewDataActions: bindActionCreators(viewDataActions, dispatch),
            paymentCapabilitiesActions: bindActionCreators(paymentCapabilitiesActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Payframe);
