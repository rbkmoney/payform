import last from 'lodash-es/last';
import {
    InvoiceChangeType,
    Event,
    getInvoiceEvents
} from 'checkout/backend';
import { getLastChange } from 'checkout/utils';

const pollingRetries = 60;
const pollingTimeout = 300;

const continuePolling = (pollCount: number, retries: number, pollFn: () => any, reject: (reason: any) => any): number => {
    const count = pollCount + 1;
    count >= retries
        ? reject({code: 'error.events.timeout'})
        : pollFn();
    return count;
};

export const pollInvoiceEvents = (endpoint: string, token: string, invoiceID: string, lastEvents?: Event[]): Promise<Event[]> => {
    return new Promise((resolve, reject) => {
        let pollCount = 0;
        (function poll() {
            setTimeout(() => {
                const lastEventID = lastEvents ? last(lastEvents).id : 0;
                getInvoiceEvents(endpoint, token, invoiceID, 10, lastEventID).then((events) => {
                    const change = getLastChange(events);
                    if (change) {
                        switch (change.changeType) {
                            case InvoiceChangeType.InvoiceStatusChanged:
                            case InvoiceChangeType.PaymentStatusChanged:
                            case InvoiceChangeType.PaymentInteractionRequested:
                                resolve(events);
                                break;
                            default:
                                pollCount = continuePolling(pollCount, pollingRetries, poll, reject);
                        }
                    } else {
                        pollCount = continuePolling(pollCount, pollingRetries, poll, reject);
                    }
                }).catch((error) => reject(error));
            }, pollingTimeout);
        })();
    });
};
