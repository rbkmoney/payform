import settings from '../../settings';

export default class InitScript {
    constructor() {
        const className = settings.htmlIntegrationClassName;
        this.element = document.querySelector(`.${className}`);
    }

    getFormNode() {
        const formNode = this.element.parentNode;
        return formNode.nodeName === 'FORM' ? formNode : undefined;
    }

    getParams() {
        const dataSet = this.element.dataset || {};
        return {
            invoiceAccessToken: dataSet.invoiceAccessToken,
            invoiceID: dataSet.invoiceId,
            logo: dataSet.logo,
            name: dataSet.name,
            label: dataSet.label || 'Pay with RBKmoney',
            popupMode: dataSet.popupMode
        }
    }

    isHtmlIntegration() {
        return this.element && this.element.dataset;
    }
}
