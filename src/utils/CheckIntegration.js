import Matcher from 'did-you-mean';
import { integration, integrationTypes } from './dictionary';
import difference from 'lodash/difference';
import getIntegrationType from './getIntegrationType';

export default class CheckIntegration {

    static makeDictionary() {
        return integration.reduce((a, c, i) => a += (i > 0 ? ` ${c.name}` : `${c.name}`), '');
    }

    static getMatcher() {
        return new Matcher(CheckIntegration.makeDictionary()).ignoreCase();
    }

    static check(config) {
        const configFields = Object.keys(config);
        const integrationType = getIntegrationType(config);
        const dictionaryFields = integration.map((item) => item.name);
        const requiredDictionary = integrationTypes.find((item) => item.name === integrationType);
        const requiredDictionaryFields = requiredDictionary ? requiredDictionary.fields : undefined;
        const configDifference = difference(configFields, dictionaryFields);
        const missedRequiredFields = difference(requiredDictionaryFields, configFields);
        const warnings = configDifference.length > 0;
        const errors = missedRequiredFields.length > 0 || integrationType === 'error';
        this.logWarnings(configDifference);
        this.logErrors(missedRequiredFields);
        if (errors) {
            this.alert('RbkmoneyCheckout.configure: Critical error! Invalid configuration options. Check your console for more info.');
        }
        if (warnings || errors) {
            this.log('warn', 'You can learn about the available configuration options in the Checkout docs: https://rbkmoney.github.io/docs/integrations/checkout');
        }
        return integrationType;
    }

    static logWarnings(warnings) {
        const matcher = CheckIntegration.getMatcher();
        warnings.forEach((warning) => {
            const guess = matcher.get(warning);
            this.log('warn', `RbkmoneyCheckout.configure: Unrecognized option '${warning}'. ${guess
                ? `Did you mean '${guess}'?`
                : ''}`);
        });
    }

    static logErrors(errors) {
        errors.forEach((item) => {
            this.log('error', `RbkmoneyCheckout.configure: '${item}' is a required option, but was not found.`)
        });
    }

    static log(level, message) {
        console[level](message);
    }

    static alert(message) {
        alert(message);
    }
}
