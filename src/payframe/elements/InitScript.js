import settings from '../../settings';
import Utils from '../../utils/Utils';

export default class InitScript {
    constructor() {
        const className = settings.integrationClassName;
        this.element = document.querySelector(`.${className}`);
        if (!this.element) {
            this.element = {};
            console.error(`Init script tag must contain ${className} class`);
        }
    }

    getParams() {
        const dataSet = this.element.dataset || {};
        return {
            key: dataSet.key,
            invoiceId: dataSet.invoiceId,
            orderId: dataSet.orderId,
            endpointInit: dataSet.endpointInit,
            endpointEvents: dataSet.endpointEvents,
            endpointFailed: dataSet.endpointFailed,
            endpointSuccess: dataSet.endpointSuccess,
            buttonColor: dataSet.buttonColor,
            logo: dataSet.logo,
            name: dataSet.name,
            amount: dataSet.amount,
            currency: dataSet.currency
        }
    }

    getHost() {
        return Utils.getOriginUrl(this.element.src);
    }
}
