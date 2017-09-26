//import fetchCapi from '../../utils/fetchCapi';

/**
 * @param {Object} params
 * @param {string} params.capiEndpoint
 * @param {string} params.invoiceID
 * @param {string} params.accessToken
 * @return {Promise<InvoicePaymentMethods>} invoicePaymentMethods
 */
function getInvoicePaymentMethods() {
    return new Promise((resolve) => {
        resolve([
            {
                method: 'BankCard',
                paymentSystems: ['visa', 'mastercard']
            },
            {
                method: 'PaymentTerminal',
                providers: ['euroset']
            }
        ])
    })
    //return fetchCapi({
    //    endpoint: `${params.capiEndpoint}/v1/processing/invoices/${params.invoiceID}/payment-methods`,
    //    accessToken: params.accessToken
    //});
}

export default getInvoicePaymentMethods;
