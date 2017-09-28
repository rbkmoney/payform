import { toNumber } from 'lodash';

/**
 * @param {Object} props - TerminalPayment component props
 */
function createInvoiceWithTemplate(props) {
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

export default createInvoiceWithTemplate;
