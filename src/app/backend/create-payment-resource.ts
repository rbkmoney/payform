import * as Fingerprint2 from 'fingerprintjs2';
import { PaymentResource, PaymentTool } from 'checkout/backend/model';
import v from './capi-version';
import { fetchCapi } from './fetch-capi';

function getFingerprintFromComponents(components: Fingerprint2.Component[]) {
    const values = components.map(({ value }) => value);
    return Fingerprint2.x64hash128(values.join(''), 31);
}

export const createPaymentResource = (
    capiEndpoint: string,
    accessToken: string,
    paymentTool: PaymentTool
): Promise<PaymentResource> =>
    Fingerprint2.getPromise().then((fingerprintComponents) =>
        fetchCapi<PaymentResource>({
            endpoint: `${capiEndpoint}/${v}/processing/payment-resources`,
            accessToken,
            method: 'POST',
            body: {
                paymentTool,
                clientInfo: {
                    fingerprint: getFingerprintFromComponents(fingerprintComponents),
                    url: (document.referrer || '').slice(0, 599)
                }
            }
        })
    );
