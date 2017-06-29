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
                        const event = self.getLastEvent(events);
                        if (self.isCreated(event)) {
                            resolve(self.prepareResult('unpaid', event));
                        } else if (self.isSuccess(event)) {
                            resolve(self.prepareResult('success', event));
                        } else if (self.isError(event)) {
                            reject({message: self.getErrorMessage(event.error, locale)});
                        } else if (self.isInteract(event)) {
                            resolve(self.prepareResult('interact', event));
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

    static prepareResult(type, event) {
        let result;
        if (type === 'success') {
            result = {type};
        } else if (type === 'interact') {
            result = {
                type: type,
                data: event.userInteraction.request
            };
        } else if (type === 'unpaid') {
            result = {
                type,
                event
            };
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

    static isCreated(event) {
        return (event && event.eventType === 'EventInvoiceCreated' && event.invoice.status === 'unpaid');
    }

    static isSuccess(event) {
        return (event && event.eventType === 'EventInvoiceStatusChanged' && event.status === 'paid');
    }

    static isError(event) {
        let result = false;
        if (event) {
            const isPaymentFailed = (event.eventType === 'EventPaymentStatusChanged' && event.status === 'failed');
            const isInvoiceFailed = (event.eventType === 'EventInvoiceStatusChanged' && event.status === 'cancelled');
            result = isPaymentFailed || isInvoiceFailed;
        }
        return result;
    }

    static isInteract(event) {
        return (event && event.eventType === 'EventInvoicePaymentInteractionRequested')
    }

    static getLastEvent(events) {
        return events && events.length > 0 ? events[events.length - 1] : null;
    }

    static getErrorMessage(error, locale) {
        if (locale[error.code]) {
            return locale[error.code]
        } else {
            return error.message;
        }
    }
}
