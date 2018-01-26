import { last } from 'lodash';
import { ChangeType, Event, getInvoiceEvents } from 'checkout/backend';
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

export const pollEvents = (endpoint: string, subject: PaymentSubject, e: Event[]): Promise<Event[]> => {
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
                            case ChangeType.InvoiceStatusChanged:
                            case ChangeType.PaymentStatusChanged:
                            case ChangeType.PaymentInteractionRequested:
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
