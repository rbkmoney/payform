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

    getFormNode() {
        let formNode = this.element;

        while (formNode.nodeName !== 'FORM') {
            if (formNode.nodeName === 'BODY') {
                return undefined;
            }

            formNode = formNode.parentNode;
        }

        return formNode;
    }

    getParams() {
        const dataSet = this.element.dataset || {};
        return {
            accessToken: dataSet.invoiceAccessToken,
            invoiceId: dataSet.invoiceId,
            orderId: dataSet.orderId,
            endpointInit: dataSet.endpointInit,
            endpointEvents: dataSet.endpointEvents,
            endpointFailed: dataSet.endpointFailed,
            endpointSuccess: dataSet.endpointSuccess,
            endpointFailedMethod: dataSet.endpointFailedMethod,
            endpointSuccessMethod: dataSet.endpointSuccessMethod,
            logo: dataSet.logo || 'images/logo.png',
            name: dataSet.name,
            amount: dataSet.amount,
            currency: dataSet.currency
        }
    }

    getHost() {
        return Utils.getOriginUrl(this.element.src);
    }
}
