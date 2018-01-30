import getCustomerEvents from './getCustomerEvents';
import {
    isCustomerBindingCreated,
    isCustomerBindingSucceed,
    isCustomerBindingFailed,
    isCustomerBindingInteractionRequested
} from './changeTypeCheckers';

/**
 * @typedef {Object} EventPollingResult
 * @property {string} type=started,created,succeed,interact
 * @property {Object} [data] - Data for provide user interaction
 */

const pollingRetries = 60;
const pollingTimeout = 300;
const eventLimit = 100;

function getLastElement(elements) {
    return elements && elements.length > 0 ? elements[elements.length - 1] : null;
}

function prepareResult(type, change, eventID) {
    let result;
    if (type === 'started' || type === 'created' || type === 'succeed') {
        result = {type};
    } else if (type === 'interact') {
        result = {
            type,
            data: change.userInteraction,
            eventID
        };
    }
    return result;
}

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.customerID
 * @param {string} param.accessToken
 * @return {Promise<EventPollingResult>} eventPollingResult
 */
function pollCustomerEvents(param) {
    let pollCount = 0;
    return new Promise((resolve, reject) => {
        (function poll(self) {
            setTimeout(() => {
                getCustomerEvents({
                    capiEndpoint: param.capiEndpoint,
                    accessToken: param.accessToken,
                    customerID: param.customerID,
                    eventID: param.eventID,
                    eventLimit
                }).then((events) => {
                    const event = getLastElement(events);
                    if (event) {
                        const change = getLastElement(event.changes);
                        if (isCustomerBindingCreated(change)) {
                            resolve(prepareResult('created', change));
                        } else if (isCustomerBindingSucceed(change)) {
                            resolve(prepareResult('succeed', change));
                        } else if (isCustomerBindingFailed(change)) {
                            reject(change.error);
                        } else if (isCustomerBindingInteractionRequested(change)) {
                            resolve(prepareResult('interact', change, event.id));
                        } else {
                            pollCount++;
                            if (pollCount >= pollingRetries) {
                                reject({code: 'error.events.timeout'});
                            } else {
                                poll(self);
                            }
                        }
                    } else if (param.eventID) {
                        pollCount++;
                        poll(self);
                    }
                }).catch((error) => reject(error));
            }, pollingTimeout);
        })(this);
    });
}

export default pollCustomerEvents;
