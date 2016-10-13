export default class EventPoller {

    static pollEvents(endpointUrl, invoiceId, timeout) {
        return new Promise((resolve, reject) => {
            (function poll(self) {
                setTimeout(() => {
                    self.requestToEndpoint(endpointUrl, invoiceId).then(events => {
                        if (self.isSuccess(events)) {
                            resolve(self.prepareResolve('success', events));
                        } else if (self.isError(events)) {
                            reject();
                        } else if (self.isInteract(events)) {
                            resolve(self.prepareResolve('interact', events));
                        } else {
                            poll(self);
                        }
                    });
                }, timeout);
            })(this);
        });
    }

    static prepareResolve(type, events) {
        let result;
        if (type === 'success') {
            result = {type}
        }
        if (type === 'interact') {
            const last = this.getLastEvent(events);
            result = {
                type: type,
                data: last.userInteraction.request
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

    static isSuccess(events) {
        const last = this.getLastEvent(events);
        return (last && last.eventType === 'EventInvoiceStatusChanged' && last.status === 'paid');
    }

    static isError(events) {
        const last = this.getLastEvent(events);
        let result = false;
        if (last) {
            const isPaymentFailed = (last.eventType === 'EventPaymentStatusChanged' && last.status === 'failed');
            const isInvoiceFailed = (last.eventType === 'EventInvoiceStatusChanged' && (last.status === 'cancelled' || last.status === 'unpaid'));
            result = isPaymentFailed || isInvoiceFailed;
        }
        return result;
    }

    static isInteract(events) {
        const last = this.getLastEvent(events);
        return (last && last.eventType === 'EventInvoicePaymentInteractionRequested')
    }

    static getLastEvent(events) {
        return events && events.length > 0 ? events[events.length - 1] : null;
    }
}
