import Matcher from 'did-you-mean';
import difference from 'lodash.difference';
import dictionary from './dictionary';

export default class CheckIntegration {

    static makeDictionary() {
        return dictionary.reduce((a, c, i) => a += (i > 0 ? ` ${c.name}` : `${c.name}`), '');
    }

    static getMatcher() {
        return new Matcher(CheckIntegration.makeDictionary()).ignoreCase();
    }

    static getType(configFields) {
        const haveTemplateID = !!configFields.find((field) => field === 'invoiceTemplateID');
        const haveInvoiceID = !!configFields.find((field) => field === 'invoiceID');
        const haveAccessToken = !!configFields.find((field) => field === 'invoiceAccessToken');

        if ((haveInvoiceID || haveAccessToken) && !haveTemplateID) {
            return 'invoice';
        } else if (haveTemplateID && (!haveInvoiceID && !haveAccessToken)) {
            return 'template';
        } else {
            return 'error';
        }
    }

    static check(config) {
        const configFields = Object.keys(config);
        const integrationType = this.getType(configFields);
        const dictionaryFields = dictionary.map((item) => item.name);
        const requiredDictionaryFields = dictionary.filter((item) => {
            switch (integrationType) {
                case 'invoice':
                    return item.name !== 'invoiceTemplateID' && item.isRequired;
                case 'template':
                    return !(item.name === 'invoiceID' || item.name === 'invoiceAccessToken') && item.isRequired;
                case 'error':
                    return item.isRequired;
            }
        }).map((item) => item.name);
        const configDifference = difference(configFields, dictionaryFields);
        const missedRequiredFields = difference(requiredDictionaryFields, configFields);
        const warnings = configDifference.length > 0;
        const errors = missedRequiredFields.length > 0;
        this.logWarnings(configDifference);
        this.logErrors(missedRequiredFields);
        if (errors) {
            this.alert('RbkmoneyCheckout.configure: Critical error! Check your console for more info.');
        }
        if (warnings || errors) {
            this.log('warn', 'You can learn about the available configuration options in the Checkout docs: https://rbkmoney.github.io/docs/integrations/checkout');
        }
        return !errors;
    }

    static logWarnings(warnings) {
        const matcher = CheckIntegration.getMatcher();
        warnings.forEach((warning) => {
            const guess = matcher.get(warning);
            this.log('warn', `RbkmoneyCheckout.configure: Unrecognized option '${warning}'. ${guess ? `Did you mean '${guess}'?` : ''}`);
        });
    }

    static logErrors(errors) {
        errors.forEach((item) => {
            this.log('error', `RbkmoneyCheckout.configure: '${item}' is a required option, but was not found.`)
        })
    }

    static log(level, message) {
        console[level](message);
    }

    static alert(message) {
        alert(message);
    }
}
