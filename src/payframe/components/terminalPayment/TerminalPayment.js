import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toNumber from 'lodash/toNumber';
import * as viewDataActions from '../../actions/viewDataActions';
import * as invoiceActions from '../../actions/invoiceActions';
import * as paymentActions from '../../actions/paymentActions';
import EurosetForm from './eurosetForm/EurosetForm';
import createInvoiceWithTemplate from './createInvoiceWithTemplate';

class TerminalPayment extends Component {

    componentDidMount() {
        this.props.actions.viewDataActions.setActiveForm('eurosetForm');
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.payment.status) {
            case 'processInvoiceTemplate': {
                const isInvoiceWithTemplateCreated = nextProps.integration.invoiceAccessToken;
                if (isInvoiceWithTemplateCreated) {
                    const formAmount = toNumber(nextProps.viewData.cardForm.amount.value) * 100;
                    const invoiceAmount = nextProps.integration.invoice.amount;
                    if (formAmount && formAmount === invoiceAmount) {
                        nextProps.actions.paymentActions.processPayment()
                    } else {
                        createInvoiceWithTemplate(nextProps);
                    }
                } else {
                    createInvoiceWithTemplate(nextProps);
                }
                break;
            }
        }
    }

    render() {
        const activeForm = this.props.viewData.activeForm;

        return(
            <div>
                {
                    activeForm === 'eurosetForm' ? <EurosetForm/> : false
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch),
            invoiceActions: bindActionCreators(invoiceActions, dispatch),
            paymentActions: bindActionCreators(paymentActions, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminalPayment);
