import settings from '../../settings';
import Utils from '../../utils/Utils';

export default class InitScript {
    constructor() {
        const className = settings.integrationClassName;
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
            logo: dataSet.logo || 'images/logo.png',
            name: dataSet.name,
            label: dataSet.label || 'Pay with RBKmoney'
        }
    }

    getHost() {
        return Utils.getOriginUrl(this.element.src);
    }
}
