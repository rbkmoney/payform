import settings from '../../settings';
import guid from '../../utils/guid';

export default class EventPoller {

    static pollEvents(capiEndpoint, invoiceID, invoiceAccessToken, locale) {
        let pollCount = 0;
        return new Promise((resolve, reject) => {
            if (!locale) {
                reject();
            }
            (function poll(self) {
                setTimeout(() => {
                    self.requestToEndpoint(capiEndpoint, invoiceID, invoiceAccessToken).then(events => {
                        const event = self.getLastElement(events);
                        const change = self.getLastElement(event.changes);
                        if (self.isUnpaid(change)) {
                            resolve(self.prepareResult('unpaid', change));
                        } else if (self.isSuccess(change)) {
                            resolve(self.prepareResult('success', change));
                        } else if (self.isError(change)) {
                            reject({message: self.getErrorMessage(change.error, locale)});
                        } else if (self.isInteract(change)) {
                            resolve(self.prepareResult('interact', change));
                        } else {
                            pollCount++;
                            if (pollCount >= settings.pollingRetries) {
                                reject({message: locale['error.events.timeout']});
                            } else {
                                poll(self);
                            }
                        }
                    }).catch(() => {
                        reject({message: locale['error.events.failed']})
                    });
                }, settings.pollingTimeout);
            })(this);
        });
    }

    static prepareResult(type, change) {
        let result;
        if (type === 'success') {
            result = {type};
        } else if (type === 'interact') {
            result = {
                type: type,
                data: change.userInteraction.request
            };
        } else if (type === 'unpaid') {
            result = { type };
        }
        return result;
    }

    static requestToEndpoint(capiEndpoint, invoiceID, invoiceAccessToken) {
        return new Promise((resolve, reject) => {
            fetch(`${capiEndpoint}/v1/processing/invoices/${invoiceID}/events?limit=100`, { // TODO fix limit count
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${invoiceAccessToken}`,
                    'X-Request-ID': guid()
                }
            }).then((response) => {
                if (response.status === 200) {
                    resolve(response.json());
                } else {
                    reject(response);
                }
            });
        });
    }

    static isUnpaid(change) {
        return (change && change.changeType === 'InvoiceCreated' && change.invoice.status === 'unpaid');
    }

    static isSuccess(change) {
        return (change && change.changeType === 'InvoiceStatusChanged' && change.status === 'paid');
    }

    static isError(change) {
        let result = false;
        if (change) {
            const isPaymentFailed = (change.eventType === 'PaymentStatusChanged' && event.status === 'failed');
            const isInvoiceFailed = (change.eventType === 'InvoiceStatusChanged' && event.status === 'cancelled');
            result = isPaymentFailed || isInvoiceFailed;
        }
        return result;
    }

    static isInteract(change) {
        return (change && change.changeType === 'PaymentInteractionRequested')
    }

    static getLastElement(elements) {
        return elements && elements.length > 0 ? elements[elements.length - 1] : null;
    }

    static getErrorMessage(error, locale) {
        if (locale[error.code]) {
            return locale[error.code]
        } else {
            return error.message;
        }
    }
}
