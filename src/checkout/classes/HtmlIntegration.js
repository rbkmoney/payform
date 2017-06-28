import StyleLink from '../elements/StyleLink';
import CheckoutButton from '../elements/CheckoutButton';
import LocaleLoader from '../../payframe/loaders/LocaleLoader';
import settings from '../../settings';

export default class HtmlIntegration {

    constructor(origin) {
        this.origin = origin;
        this.element = document.querySelector(`.${settings.htmlIntegrationClassName}`);
        this.available = this.isAvailable();
        this.config = {};
    }

    isAvailable() {
        return this.element && this.element.dataset;
    }

    renderCheckoutButton() {
        if (!this.available) {
            return;
        }
        const styles = new StyleLink(this.origin);
        styles.render();
        let label = this.element.dataset.label;
        if (!label) {
            label = this.getLabel(LocaleLoader.getAvailableLocale(this.element.dataset.locale));
        }
        const button = new CheckoutButton(label, settings.htmlIntegrationClassName);
        button.render();
        return button;
    }

    getLabel(locale) {
        switch (locale) {
            case 'ru':
                return 'Оплатить через RBKmoney';
            case 'en':
            default:
                return 'Pay with RBKmoney';
        }
    }

    getConfig() {
        if (!this.available) {
            return;
        }
        this.config = Object.assign({}, this.element.dataset);
        this.config.invoiceID = this.element.dataset.invoiceId;
        delete this.config.invoiceId;
        this.assignFinished(this.config);
        return this.config;
    }

    assignFinished(config) {
        const outerForm = this.getOuterForm();
        if (!outerForm) {
            return config;
        }
        return Object.assign(config, {
            finished: () => {
                outerForm.submit();
            }
        });
    }

    getOuterForm() {
        if (!this.available) {
            return;
        }
        const node = this.element.parentNode;
        if (node && (node.nodeName === 'FORM' && node.action)) {
            return node;
        }
    }
}
