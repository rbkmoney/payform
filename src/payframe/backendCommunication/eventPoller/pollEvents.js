import getInvoiceEvents from './getInvoiceEvents';
import {
    isInvoiceCancelled,
    isInvoicePaid,
    isInvoiceUnpaid,
    isPaymentCancelled,
    isPaymentFailed,
    isPaymentInteractionRequested,
    isPaymentProcessed
} from './changeTypeCheckers';

/**
 * @typedef {Object} EventPollingResult
 * @property {string} type=paid,unpaid,processed,interact
 * @property {Object} [data] - Data for provide user interaction
 */

const pollingRetries = 60;
const pollingTimeout = 300;
const eventLimit = 100;

function getLastElement(elements) {
    return elements && elements.length > 0 ? elements[elements.length - 1] : null;
}

function prepareResult(type, change, eventID) {
    let result;
    if (type === 'paid' || type === 'unpaid' || type === 'processed') {
        result = {type};
    } else if (type === 'interact') {
        result = {
            type,
            data: change.userInteraction,
            eventID
        };
    }
    return result;
}

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.invoiceID
 * @param {string} param.accessToken
 * @return {Promise<EventPollingResult>} eventPollingResult
 */
function pollEvents(param) {
    let pollCount = 0;
    return new Promise((resolve, reject) => {
        (function poll(self) {
            setTimeout(() => {
                getInvoiceEvents({
                    capiEndpoint: param.capiEndpoint,
                    accessToken: param.accessToken,
                    invoiceID: param.invoiceID,
                    eventID: param.eventID,
                    eventLimit
                }).then((events) => {
                    const event = getLastElement(events);
                    if (event) {
                        const change = getLastElement(event.changes);
                        if (isInvoiceUnpaid(change)) {
                            resolve(prepareResult('unpaid', change));
                        } else if (isInvoicePaid(change)) {
                            resolve(prepareResult('paid', change));
                        } else if (isPaymentFailed(change)) {
                            reject(change.error);
                        } else if (isPaymentInteractionRequested(change)) {
                            resolve(prepareResult('interact', change, event.id));
                        } else if (isPaymentCancelled(change)) {
                            reject({code: 'error.payment.cancelled'});
                        } else if (isInvoiceCancelled(change)) {
                            reject({code: 'error.invoice.cancelled'});
                        } else if (isPaymentProcessed(change)) {
                            resolve(prepareResult('processed'));
                        } else {
                            pollCount++;
                            if (pollCount >= pollingRetries) {
                                reject({code: 'error.events.timeout'});
                            } else {
                                poll(self);
                            }
                        }
                    } else if (param.eventID) {
                        pollCount++;
                        poll(self);
                    }
                }).catch((error) => reject(error));
            }, pollingTimeout);
        })(this);
    });
}

export default pollEvents;
