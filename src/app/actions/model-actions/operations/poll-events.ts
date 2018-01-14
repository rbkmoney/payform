import { last } from 'lodash';
import { ChangeType, Event, getInvoiceEvents } from 'checkout/backend';
import { getLastChange } from 'checkout/utils';
import { PaymentSubject } from './payment-subject';

const pollingRetries = 60;
const pollingTimeout = 300;

export const pollEvents = (endpoint: string, subject: PaymentSubject, previousEvents: Event[]): Promise<Event[]> => {
    return new Promise((resolve, reject) => {
        let pollCount = 0;
        (function poll() {
            setTimeout(() => {
                // const lastEventID = previousEvents ? last(previousEvents).id : 0; // TODO fix it
                getInvoiceEvents(endpoint, subject.accessToken, subject.invoiceID, 10).then((events) => {
                    const change = getLastChange(events);
                    switch (change.changeType) {
                        case ChangeType.InvoiceStatusChanged:
                        case ChangeType.PaymentStatusChanged:
                        case ChangeType.PaymentInteractionRequested:
                            resolve(events);
                            break;
                        default:
                            pollCount++;
                            pollCount >= pollingRetries
                                ? reject({code: 'error.events.timeout'})
                                : poll();
                    }
                }).catch((error) => reject(error));
            }, pollingTimeout);
        })();
    });
};
