import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as localeActions from '../../redux/actions/localeActions';
import * as invoiceActions from '../../redux/actions/invoiceActions';
import * as errorActions from '../../redux/actions/errorActions';
import * as invoiceTemplateActions from '../../redux/actions/invoiceTemplates';
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
        switch (this.props.integration.type) {
            case 'default':
                this.props.actions.invoiceActions.getInvoice(
                    this.props.appConfig.capiEndpoint,
                    this.props.initParams.invoiceID,
                    this.props.initParams.invoiceAccessToken
                );
                break;
            case 'template':
                this.props.actions.invoiceTemplateActions.getInvoiceTemplate(
                    this.props.appConfig.capiEndpoint,
                    this.props.initParams.invoiceTemplateID,
                    this.props.initParams.invoiceTemplateAccessToken
                );
                break;
        }
    }

    componentWillReceiveProps(props) {
        const invoice = props.integration.invoice;
        if (props.integration.type === 'default' && invoice) {
            switch (invoice.status) {
                case 'unpaid':
                    this.setState({status: 'ready'});
                    break;
                case 'cancelled':
                    this.setState({status: 'error'});
                    this.props.actions.errorActions.setError({
                        localePath: 'error.invoice.cancelled'
                    });
                    break;
                case 'paid':
                    this.setState({status: 'error'});
                    this.props.actions.errorActions.setError({
                        localePath: 'error.invoice.paid'
                    });
                    break;
            }
        } else if (props.integration.type === 'template') {
            this.setState({status: 'ready'});
        }

        if (props.error) {
            this.setState({status: 'error'});
        }
    }

    render() {
        return (
            <div>
                <Overlay loader={this.state.status === 'process'}/>
                {this.state.status === 'ready' ? <Modal setCheckoutDone={this.props.setCheckoutDone}/> : false}
                {this.state.status === 'error' ? <MessageModal/> : false}
            </div>
        );
    }
}

function mapState(state) {
    return {
        appConfig: state.appConfig,
        initParams: state.initParams,
        integration: state.integration,
        error: state.error
    };
}

function mapActions(dispatch) {
    return {
        actions: {
            localeActions: bindActionCreators(localeActions, dispatch),
            invoiceActions: bindActionCreators(invoiceActions, dispatch),
            invoiceTemplateActions: bindActionCreators(invoiceTemplateActions, dispatch),
            errorActions: bindActionCreators(errorActions, dispatch)
        }
    };
}

export default connect(mapState, mapActions)(Payframe);