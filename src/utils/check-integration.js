import Matcher from 'did-you-mean';
import integration from './dictionary';

let dictionary = '';

for (const prop in integration) {
    if (integration.hasOwnProperty(prop)) {
        dictionary += `${prop} `;
    }
}

const m = new Matcher(dictionary);
m.ignoreCase();

export default function(props) {
    for (const prop in props) {
        if (props.hasOwnProperty(prop)) {
            if (!integration[prop]) {
                console.warn(`RbkmoneyCheckout.configure: Unrecognized option '${prop}'. ${integration[m.get(prop)] ? `Did you mean '${m.get(prop)}'?` : false}`);
                console.warn('You can learn about the available configuration options in the Checkout docs: https://rbkmoney.github.io/docs/integrations/checkout');
            }
        }
    }
}