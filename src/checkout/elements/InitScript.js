import CheckIntegration from '../../utils/CheckIntegration';
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
        if (dataSet.invoiceId) {
            dataSet.invoiceID = dataSet.invoiceId;
            delete dataSet.invoiceId;
        }
        CheckIntegration.check(dataSet);

        return {
            invoiceAccessToken: dataSet.invoiceAccessToken,
            invoiceID: dataSet.invoiceID,
            email: dataSet.email,
            logo: dataSet.logo,
            name: dataSet.name,
            label: dataSet.label || 'Pay with RBKmoney',
            description: dataSet.description,
            payButtonLabel: dataSet.payButtonLabel || 'Оплатить',
            popupMode: dataSet.popupMode
        }
    }

    isHtmlIntegration() {
        return this.element && this.element.dataset;
    }
}
