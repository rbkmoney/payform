import Matcher from 'did-you-mean';
import integration from './dictionary';
import jwtDecode from 'jwt-decode';

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

    static checkToken(key, invoiceID) {
        const decodedKey = jwtDecode(key);
        if (decodedKey.resource_access && decodedKey.resource_access['common-api'] && decodedKey.resource_access['common-api'].roles) {
            const arr = decodedKey.resource_access['common-api'].roles;
            const roles = {};

            for (let i = 0; i < arr.length; i++) {
                const splited = arr[i].split(':');
                if (!roles.hasOwnProperty([splited[0]])) {
                    roles[splited[0]] = splited[1];
                } else {
                    roles[splited[0]] = {
                        [roles[splited[0]]]: true,
                        [splited[1]]: true
                    }
                }
            }

            const invoicesRead = roles[`invoices.${invoiceID}`] === 'read';
            const invoicesPayments = roles[`invoices.${invoiceID}.payments`] && roles[`invoices.${invoiceID}.payments`].read && roles[`invoices.${invoiceID}.payments`].write;
            const paymentTool = roles['payment_tool_tokens'] === 'write';

            if (invoicesRead && invoicesPayments && paymentTool) {
                return true;
            } else {
                console.error('RbkmoneyCheckout.configure: RbkmoneyCheckout.configure: Wrong value \'data-invoice-access-token\'. You used API key. Please use invoice access token.');
                return false;
            }
        }
    }

    static check(props) {
        const m = CheckIntegration.getMatcher();
        let errors = 0;
        let criticalErrors = 0;

        if (props.invoiceAccessToken && props.invoiceID) {
            if (!CheckIntegration.checkToken(props.invoiceAccessToken, props.invoiceID)) {
                ++criticalErrors;
            }
        }

        if (criticalErrors > 0) {
            alert('RbkmoneyCheckout.configure: Critical error! Check your console for more info.');
        }

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

        if (errors > 0 || criticalErrors > 0) {
            console.warn('You can learn about the available configuration options in the Checkout docs: https://rbkmoney.github.io/docs/integrations/checkout');
        }

        return criticalErrors <= 0;
    }
}