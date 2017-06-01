import Matcher from 'did-you-mean';
import integration from './dictionary';

export default class CheckIntegration {
    static getMatcher() {
        let dictionary = '';

        for (const prop in integration) {
            if (integration.hasOwnProperty(prop)) {
                dictionary += `${prop} `;
            }
        }

        const m = new Matcher(dictionary);
        m.ignoreCase();

        return m;
    }

    static check(props) {
        const m = CheckIntegration.getMatcher();
        let errors = 0;
        let criticalErrors = 0;

        for (const prop in props) {
            if (props.hasOwnProperty(prop)) {
                if (!integration[prop]) {
                    ++errors;
                    console.warn(`RbkmoneyCheckout.configure: Unrecognized option '${prop}'. ${integration[m.get(prop)] ? `Did you mean '${m.get(prop)}'?` : ''}`);
                }
            }
        }

        for (const prop in integration) {
            if (integration.hasOwnProperty(prop)) {
                if (integration[prop].isRequired && !props[prop]) {
                    ++criticalErrors;
                    console.error(`RbkmoneyCheckout.configure: '${prop}' is a required option, but was not found.`)
                }
            }
        }

        if (errors > 0) {
            console.warn('You can learn about the available configuration options in the Checkout docs: https://rbkmoney.github.io/docs/integrations/checkout');
        }

        return criticalErrors <= 0;
    }
}