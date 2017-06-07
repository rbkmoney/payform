import Matcher from 'did-you-mean';
import difference from 'lodash.difference';
import integration from './dictionary';

export default class CheckIntegration {
    static makeDictionary() {
        return integration.reduce((previousValue, currentValue, index) => {
            if (index === 1) {
                return `${previousValue.name} ${currentValue.name}`;
            } else {
                return `${previousValue} ${currentValue.name}`;
            }

        });
    }

    static getMatcher() {
        const m = new Matcher(CheckIntegration.makeDictionary());
        m.ignoreCase();

        return m;
    }

    static check(props) {
        const m = CheckIntegration.getMatcher();
        let errors = false;
        let criticalErrors = false;
        const propsKeys = Object.keys(props);
        const integrationKeys = integration.map((item) => item.name);
        const requiredKeys = integration.filter((item) => item.isRequired).map((item) => item.name);
        const diff = difference(propsKeys, integrationKeys);
        const reqDiff = difference(requiredKeys, propsKeys);

        diff.forEach((item) => {
            errors = true;
            this.log('warn', `RbkmoneyCheckout.configure: Unrecognized option '${item}'. ${m.get(item) ? `Did you mean '${m.get(item)}'?` : ''}`);
        });

        reqDiff.forEach((item) => {
            criticalErrors = true;
            this.log('error', `RbkmoneyCheckout.configure: '${item}' is a required option, but was not found.`)
        });

        if (criticalErrors) {
            this.alert('RbkmoneyCheckout.configure: Critical error! Check your console for more info.');
        }

        if (errors || criticalErrors) {
            this.log('warn', 'You can learn about the available configuration options in the Checkout docs: https://rbkmoney.github.io/docs/integrations/checkout');
        }

        return !criticalErrors;
    }

    static log(level, message) {
        console[level](message);
    }

    static alert(message) {
        alert(message);
    }
}