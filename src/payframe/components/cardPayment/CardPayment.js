import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewDataActions from '../../actions/viewDataActions';
import * as paymentActions from '../../actions/paymentActions';
import * as invoiceActions from '../../actions/invoiceActions';
import * as errorActions from '../../actions/errorActions';
import CardForm from './cardForm/CardForm';
import ApplePayForm from './applePayForm/ApplePayForm';
import createInvoiceWithTemplate from './createInvoiceWithTemplate';
import handleInvoiceTemplate from './handleInvoiceTemplate';
import handleInteraction from './handleInteraction';

class CardPayment extends React.Component {

    componentDidMount() {
        if (this.props.paymentCapabilities.applePay === 'capable') {
            this.props.actions.viewDataActions.setActiveForm('applePayForm');
        } else {
            this.props.actions.viewDataActions.setActiveForm('cardForm');
        }
        switch (this.props.integration.type) {
            case 'default':
                handleInteraction(this.props);
                break;
            case 'template':
                handleInvoiceTemplate(this.props);
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.payment.status) {
            case 'processInvoiceTemplate': {
                const isInvoiceWithTemplateCreated = nextProps.integration.invoiceAccessToken;
                isInvoiceWithTemplateCreated
                    ? nextProps.actions.paymentActions.processPayment()
                    : createInvoiceWithTemplate(nextProps);
                break;
            }
        }
    }

    render() {
        const activeForm = this.props.viewData.activeForm;
        return (
            <div>
                {
                    activeForm === 'applePayForm' ? <ApplePayForm/> : false
                }
                {
                    activeForm === 'cardForm' ? <CardForm/> : false
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        appConfig: state.appConfig,
        initParams: state.initParams,
        integration: state.integration,
        viewData: state.viewData,
        payment: state.payment,
        paymentCapabilities: state.paymentCapabilities
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch),
            invoiceActions: bindActionCreators(invoiceActions, dispatch),
            paymentActions: bindActionCreators(paymentActions, dispatch),
            errorActions: bindActionCreators(errorActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPayment);
