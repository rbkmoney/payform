export default class EventPoller {

    static pollEvents(endpointUrl, invoiceId, timeout) {
        return new Promise((resolve, reject) => {
            (function poll(self) {
                setTimeout(() => {
                    self.requestToEndpoint(endpointUrl, invoiceId).then(events => {
                        const event = self.getLastEvent(events);
                        if (self.isSuccess(event)) {
                            resolve(self.prepareResult('success', event));
                        } else if (self.isError(event)) {
                            reject(self.prepareResult('error', event));
                        } else if (self.isInteract(event)) {
                            resolve(self.prepareResult('interact', event));
                        } else {
                            poll(self);
                        }
                    });
                }, timeout);
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
        } else if (type === 'error') {
            result = {
                type: type,
                data: event
            }
        }
        return result;
    }

    static requestToEndpoint(endpointUrl, invoiceId) {
        return new Promise((resolve, reject) => {
            fetch(this.buildUrl(endpointUrl, invoiceId), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response.json());
                } else {
                    reject(response.json());
                }
            });
        });
    }

    static buildUrl(endpointUrl, invoiceId) {
        const url = new URL(endpointUrl);
        url.searchParams.append('invoiceId', invoiceId);
        return url;
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
