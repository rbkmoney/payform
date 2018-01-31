import { last } from 'lodash';
import {
    InvoiceChangeType,
    Event,
    getInvoiceEvents,
    CustomerEvent,
    getCustomerEvents,
    CustomerChangeType
} from 'checkout/backend';
import { getLastChange } from 'checkout/utils';
import { PaymentSubject } from './payment-subject';
import { IntegrationType } from 'checkout/config';

const pollingRetries = 60;
const pollingTimeout = 300;

const continuePolling = (pollCount: number, retries: number, pollFn: () => any, reject: (reason: any) => any): number => {
    const count = pollCount + 1;
    count >= retries
        ? reject({code: 'error.events.timeout'})
        : pollFn();
    return count;
};

export const pollInvoiceEvents = (endpoint: string, subject: PaymentSubject, e: Event[]): Promise<Event[]> => {
    return new Promise((resolve, reject) => {
        let pollCount = 0;
        (function poll() {
            setTimeout(() => {
                const templateIntegration = subject.integrationType === IntegrationType.invoiceTemplate;
                const lastEventID = (e && !templateIntegration) ? last(e).id : 0;
                getInvoiceEvents(endpoint, subject.accessToken, subject.invoiceID, 10, lastEventID).then((events) => {
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

export const pollCustomerEvents = (endpoint: string, accessToken: string, customerID: string, e: CustomerEvent[]): Promise<CustomerEvent[]> => {
    return new Promise((resolve, reject) => {
        let pollCount = 0;
        (function poll() {
            setTimeout(() => {
                const lastEvent = last(e);
                const lastEventID = lastEvent ? lastEvent.id : 0;
                getCustomerEvents(endpoint, accessToken, customerID, 10, lastEventID).then((events) => {
                    const change = getLastChange(events);
                    if (change) {
                        switch (change.changeType) {
                            case CustomerChangeType.CustomerBindingStatusChanged:
                            case CustomerChangeType.CustomerBindingInteractionRequested:
                                resolve(events);
                                break;
                            default:
                                pollCount = continuePolling(pollCount, pollingRetries, poll, reject);
                        }
                    } else {
                        pollCount = continuePolling(pollCount, pollingRetries, poll, reject);
                    }
                });
            }, pollingTimeout);
        })();
    });
};
