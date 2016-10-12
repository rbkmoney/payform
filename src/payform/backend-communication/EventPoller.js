export default class EventPoller {

    static pollEvents(endpointUrl, invoiceId, timeout) {
        return new Promise((resolve, reject) => {
            (function poll(self) {
                setTimeout(() => {
                    self.requestToEndpoint(endpointUrl, invoiceId).then(events => {
                        if (self.isSuccess(events)) {
                            resolve();
                        } else if (self.isError()) {
                            reject();
                        } else {
                            poll(self);
                        }
                    });
                }, timeout);
            })(this);
        });
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
        return (last && last.eventType === 'invoiceStatusChanged' && last.status === 'paid');
    }

    static isError(events) {
        const last = this.getLastEvent(events);
        let result = false;
        if (last) {
            const isPaymentFailed = (last.eventType === 'paymentStatusChanged' && last.status === 'failed');
            const isInvoiceFailed = (last.eventType === 'invoiceStatusChanged' && (last.status === 'cancelled' || last.status === 'unpaid'));
            result = isPaymentFailed || isInvoiceFailed;
        }
        return result;
    }

    static getLastEvent(events) {
        return events && events.length > 0 ? events[events.length - 1] : null;
    }
}
