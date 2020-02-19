import * as Fingerprint2 from 'fingerprintjs2';
import { PaymentResource, PaymentTool } from 'checkout/backend/model';
import v from './capi-version';
import { fetchCapi } from './fetch-capi';

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
                    fingerprint: Fingerprint2.x64hash128(fingerprintComponents.join(''), 31)
                }
            }
        })
    );
