import settings from '../../settings';

export default class EventPoller {

    static pollEvents(endpointUrl, invoiceId, orderId) {
        let pollCount = 0;
        return new Promise((resolve, reject) => {
            (function poll(self) {
                setTimeout(() => {
                    self.requestToEndpoint(endpointUrl, invoiceId, orderId).then(events => {
                        const event = self.getLastEvent(events);
                        if (self.isSuccess(event)) {
                            resolve(self.prepareResult('success', event));
                        } else if (self.isError(event)) {
                            reject({message: 'An error occurred while processing your card'});
                        } else if (self.isInteract(event)) {
                            resolve(self.prepareResult('interact', event));
                        } else {
                            pollCount++;
                            if (pollCount >= settings.pollingRetries) {
                                reject({message: 'Events polling timeout error'});
                            } else {
                                poll(self);
                            }
                        }
                    }).catch(() => reject({message: 'An error occurred while polling events'}));
                }, settings.pollingTimeout);
            })(this);
        });
    }

    static prepareResult(type, event) {
        let result;
        if (type === 'success') {
            result = {type}
        } else if (type === 'interact') {
            result = {
                type: type,
                data: event.userInteraction.request
            }
        }
        return result;
    }

    static requestToEndpoint(endpointUrl, invoiceId, orderId) {
        return new Promise((resolve, reject) => {
            fetch(`${endpointUrl}?invoiceId=${invoiceId}&orderId=${orderId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response.json());
                } else {
                    reject(response);
                }
            });
        });
    }

    static isSuccess(event) {
        return (event && event.eventType === 'EventInvoiceStatusChanged' && event.status === 'paid');
    }

    static isError(event) {
        let result = false;
        if (event) {
            const isPaymentFailed = (event.eventType === 'EventPaymentStatusChanged' && event.status === 'failed');
            const isInvoiceFailed = (event.eventType === 'EventInvoiceStatusChanged' && (event.status === 'cancelled' || event.status === 'unpaid'));
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
}
