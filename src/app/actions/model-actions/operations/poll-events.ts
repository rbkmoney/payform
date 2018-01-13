import { ChangeType, Event, getInvoiceEvents } from 'checkout/backend';
import { checkLastChange } from 'checkout/form-flow';
import { PaymentSubject } from './get-payment-subject';

const pollingRetries = 60;
const pollingTimeout = 300;

export const pollEvents = (endpoint: string, subject: PaymentSubject, eventID = 0): Promise<Event[]> => {
    return new Promise((resolve, reject) => {
        let pollCount = 0;
        (function poll() {
            setTimeout(() => {
                getInvoiceEvents(endpoint, subject.accessToken, subject.invoiceID, 10, eventID).then((events) => {
                    const isLastChange = checkLastChange.bind(null, events, eventID);
                    const isInvoiceChange = isLastChange.bind(null, ChangeType.InvoiceStatusChanged);
                    const isPaymentChange = isLastChange.bind(null, ChangeType.PaymentStatusChanged);
                    const isInteraction = isLastChange.bind(null, ChangeType.PaymentInteractionRequested);
                    if (isInvoiceChange() || isPaymentChange() || isInteraction()) {
                        resolve(events);
                    } else {
                        pollCount++;
                        if (pollCount >= pollingRetries) {
                            reject({code: 'error.events.timeout'});
                        } else {
                            poll();
                        }
                    }
                }).catch((error) => reject(error));
            }, pollingTimeout);
        })();
    });
};
