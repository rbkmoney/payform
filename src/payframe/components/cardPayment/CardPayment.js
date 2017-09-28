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

class CardPayment extends React.Component {

    componentDidMount() {
        const card = this.props.paymentCapabilities.capabilities.find((capability) => capability.name === 'card');
        if (card.methods.find((method) => method === 'applePay')) {
            this.props.actions.viewDataActions.setActiveForm({
                activeForm: 'applePayForm',
                paymentMethod: 'BankCard'
            });
        } else {
            this.props.actions.viewDataActions.setActiveForm({
                activeForm: 'cardForm',
                paymentMethod: 'BankCard'
            });
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
