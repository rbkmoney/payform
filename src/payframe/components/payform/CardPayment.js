import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toNumber } from 'lodash';
import * as viewDataActions from '../../../redux/actions/viewDataActions';
import * as paymentActions from '../../../redux/actions/paymentActions';
import * as invoiceActions from '../../../redux/actions/invoiceActions';
import CardForm from './cardForm/CardForm';
import ApplePayForm from './applePayForm/ApplePayForm';
import EventPoller from '../../backend-communication/EventPoller';

class CardPayment extends React.Component {

    componentDidMount() {
        if (this.props.paymentCapabilities.applePay === 'capable') {
            this.props.actions.viewDataActions.setActiveForm('applePayForm');
        } else {
            this.props.actions.viewDataActions.setActiveForm('cardForm');
        }
        switch (this.props.integration.type) {
            case 'default':
                this.checkInteract(this.props);
                break;
            case 'template':
                this.handleTemplate(this.props);
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.payment.status) {
            case 'processInvoiceTemplate': {
                const token = nextProps.integration.invoiceAccessToken;
                token
                    ? nextProps.actions.paymentActions.processPayment(token.payload)
                    : this.createInvoiceWithTemplate(nextProps);
                break;
            }
        }
    }

    createInvoiceWithTemplate(props) {
        const form = props.viewData.cardForm;
        const template = props.integration.invoiceTemplate;
        const initParams = props.initParams;
        props.actions.invoiceActions.createInvoiceWithTemplate({
            capiEndpoint: props.appConfig.capiEndpoint,
            accessToken: initParams.invoiceTemplateAccessToken,
            invoiceTemplateID: initParams.invoiceTemplateID,
            invoiceParamsWithTemplate: {
                amount: toNumber(form.amount.value) * 100,
                currency: 'RUB',
                metadata: template.metadata
            }
        });
    }

    handleTemplate(props) {
        const actions = props.actions.viewDataActions;
        const cost = props.integration.invoiceTemplate.cost;
        let visible = false;
        switch (cost.invoiceTemplateCostType) {
            case 'InvoiceTemplateCostRange':
                actions.setAmountType({
                    name: 'range',
                    lowerBound: cost.range.lowerBound,
                    upperBound: cost.range.upperBound
                });
                visible = true;
                break;
            case 'InvoiceTemplateCostUnlim':
                actions.setAmountType({
                    name: 'unlim'
                });
                visible = true;
                break;
            case 'InvoiceTemplateCostFixed':
                actions.setAmountType({
                    name: 'fixed'
                });
                actions.setAmountVal(cost.amount / 100);
                break;
        }
        actions.setAmountVisibility(visible);
        actions.setAmountRequired(true);
    }

    checkInteract(props) {
        EventPoller.pollEvents(
            props.appConfig.capiEndpoint,
            props.integration.invoice.id,
            props.initParams.invoiceAccessToken
        ).then((event) => {
            if (event.type === 'interact') {
                props.actions.paymentActions.interactPayment(event.data);
                props.actions.viewDataActions.updateContainerSize('large');
            }
        });
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
            paymentActions: bindActionCreators(paymentActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPayment);
