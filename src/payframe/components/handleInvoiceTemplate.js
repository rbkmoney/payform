/**
 * @param {InvoiceLine[]} cart
 */
function calcCartAmount(cart) {
    return cart.reduce((acc, current) => acc + (current.price * current.quantity), 0);
}

/**
 * @param {InvoiceLine[]} cart
 * @param {Object} actions - viewDataActions
 */
function handleMultiLine(cart, actions) {
    actions.setAmountType({
        name: 'fixed'
    });
    actions.setAmountVal(calcCartAmount(cart) / 100);
    actions.setAmountVisibility(false);
    actions.setAmountRequired(true);
}

/**
 * @param {InvoiceTemplateLineCost} price
 * @param {Object} actions - viewDataActions
 */
function handleSingleLine(price, actions) {
    let visible = false;
    switch (price.costType) {
        case 'InvoiceTemplateLineCostRange':
            actions.setAmountType({
                name: 'range',
                lowerBound: price.range.lowerBound,
                upperBound: price.range.upperBound
            });
            visible = true;
            break;
        case 'InvoiceTemplateLineCostUnlim':
            actions.setAmountType({
                name: 'unlim'
            });
            visible = true;
            break;
        case 'InvoiceTemplateLineCostFixed':
            actions.setAmountType({
                name: 'fixed'
            });
            actions.setAmountVal(price.amount / 100);
            break;
    }
    actions.setAmountVisibility(visible);
    actions.setAmountRequired(true);
}

/**
 * @param {Object} props - Modal component props
 */
function handleInvoiceTemplate(props) {
    const actions = props.actions.viewDataActions;
    const details = props.integration.invoiceTemplate.details;
    switch (details.templateType) {
        case 'InvoiceTemplateMultiLine':
            handleMultiLine(details.cart, actions);
            break;
        case 'InvoiceTemplateSingleLine':
            handleSingleLine(details.price, actions);
            break;
    }
}

export default handleInvoiceTemplate;
