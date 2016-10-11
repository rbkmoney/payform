export default class EventPoller {

    static pollEvents(endpointUrl, invoiceId, timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.requestToEndpoint(endpointUrl, invoiceId).then(events => {
                    if (this.isSuccess(events)) {
                        resolve();
                    } else if (this.isPadding(events)) {

                    } else if (this.isError()) {
                        reject();
                    }
                });
            }, timeout);
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

    static isPadding(events) {
        return false;
    }

    static isError(events) {
        return false;
    }

    static getLastEvent(events) {
        return events && events.length > 0 ? events[events.length - 1] : null;
    }
}
