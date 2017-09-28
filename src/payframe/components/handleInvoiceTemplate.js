/**
 * @param {Object} props - Modal component props
 */
function handleInvoiceTemplate(props) {
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

export default handleInvoiceTemplate;
