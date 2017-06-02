import Matcher from 'did-you-mean';
import integration from './dictionary';
import jwtDecode from 'jwt-decode';

export default class CheckIntegration {
    static makeDictionary() {
        let dictionary = '';

        for (const prop in integration) {
            if (integration.hasOwnProperty(prop)) {
                dictionary += `${prop} `;
            }
        }

        return dictionary;
    }

    static getMatcher() {
        const m = new Matcher(CheckIntegration.makeDictionary());
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

        if (criticalErrors > 0) {
            alert('RbkmoneyCheckout.configure: Critical error! Check your console for more info.');
        }

        if (errors > 0 || criticalErrors > 0) {
            console.warn('You can learn about the available configuration options in the Checkout docs: https://rbkmoney.github.io/docs/integrations/checkout');
        }

        return criticalErrors <= 0;
    }
}