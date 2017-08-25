import fetchCapi from '../../utils/fetchCapi';

const pollingRetries = 60;
const pollingTimeout = 300;
const eventLimit = 100;

class EventPoller {

    static pollEvents(capiEndpoint, invoiceID, invoiceAccessToken) {
        let pollCount = 0;
        return new Promise((resolve, reject) => {
            (function poll(self) {
                setTimeout(() => {
                    self.requestToEndpoint(capiEndpoint, invoiceID, invoiceAccessToken).then((events) => {
                        const event = self.getLastElement(events);
                        const change = self.getLastElement(event.changes);
                        if (self.isInvoiceUnpaid(change)) {
                            resolve(self.prepareResult('unpaid', change));
                        } else if (self.isInvoicePaid(change)) {
                            resolve(self.prepareResult('paid', change));
                        } else if (self.isPaymentFailed(change)) {
                            reject(change.error);
                        } else if (self.isPaymentInteractionRequested(change)) {
                            resolve(self.prepareResult('interact', change));
                        } else if (self.isPaymentCancelled(change)) {
                            reject({code: 'error.payment.cancelled'});
                        } else if (self.isInvoiceCancelled(change)) {
                            reject({code: 'error.invoice.cancelled'});
                        } else if (self.isPaymentProcessed(change)) {
                            resolve(self.prepareResult('processed'));
                        } else {
                            pollCount++;
                            if (pollCount >= pollingRetries) {
                                reject({code: 'error.events.timeout'});
                            } else {
                                poll(self);
                            }
                        }
                    }).catch((error) => reject(error));
                }, pollingTimeout);
            })(this);
        });
    }

    static prepareResult(type, change) {
        let result;
        if (type === 'paid' || type === 'unpaid' || type === 'processed') {
            result = {type};
        } else if (type === 'interact') {
            result = {
                type,
                data: change.userInteraction.request
            };
        }
        return result;
    }

    static requestToEndpoint(capiEndpoint, invoiceID, accessToken) {
        return fetchCapi({
            endpoint: `${capiEndpoint}/v1/processing/invoices/${invoiceID}/events?limit=${eventLimit}`,
            accessToken
        });
    }

    static isInvoiceUnpaid(change) {
        return (change && change.changeType === 'InvoiceCreated' && change.invoice.status === 'unpaid');
    }

    static isInvoicePaid(change) {
        return (change && change.changeType === 'InvoiceStatusChanged' && change.status === 'paid');
    }

    static isPaymentCancelled(change) {
        return (change.changeType === 'PaymentStatusChanged' && change.status === 'cancelled');
    }

    static isInvoiceCancelled(change) {
        return (change.changeType === 'InvoiceStatusChanged' && change.status === 'cancelled');
    }

    static isPaymentFailed(change) {
        return (change.changeType === 'PaymentStatusChanged' && change.status === 'failed');
    }

    static isPaymentProcessed(change) {
        return (change.changeType === 'PaymentStatusChanged' && change.status === 'processed');
    }

    static isPaymentInteractionRequested(change) {
        return (change && change.changeType === 'PaymentInteractionRequested');
    }

    static getLastElement(elements) {
        return elements && elements.length > 0 ? elements[elements.length - 1] : null;
    }
}

export default EventPoller;
