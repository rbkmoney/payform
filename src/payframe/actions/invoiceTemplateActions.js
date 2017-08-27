import { SET_INVOICE_TEMPLATE } from '../constants/invoiceTemplate';
import { SET_ERROR } from '../constants/error';
import getInvoiceTemplateFromCapi from '../backendCommunication/getInvoiceTemplate';

function setError(localePath) {
    return {
        type: SET_ERROR,
        payload: {
            localePath
        }
    };
}

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.invoiceTemplateID
 * @param {string} param.accessToken
 */
function getInvoiceTemplate(param) {
    return (dispatch) => {
        getInvoiceTemplateFromCapi({
            capiEndpoint: param.capiEndpoint,
            invoiceTemplateID: param.invoiceTemplateID,
            accessToken: param.accessToken
        }).then((response) => {
            dispatch({
                type: SET_INVOICE_TEMPLATE,
                payload: {
                    invoiceTemplate: response
                }
            });
        }).catch((error) => {
            console.error(error);
            dispatch(setError('error.invoice.getTemplate'));
        });
    };
}

export { getInvoiceTemplate };
