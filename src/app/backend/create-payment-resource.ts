import Fingerprint2 from 'fingerprintjs2';
import { PaymentResource, PaymentTool } from 'checkout/backend/model';
import v from './capi-version';
import { fetchCapi } from './fetch-capi';

const getFingerprint = (): Promise<string> =>
    new Promise((resolve) => new Fingerprint2().get((fingerprint) => resolve(fingerprint)));

export const createPaymentResource = (capiEndpoint: string, accessToken: string, paymentTool: PaymentTool): Promise<PaymentResource> =>
    getFingerprint().then((fingerprint) =>
        fetchCapi<PaymentResource>({
            endpoint: `${capiEndpoint}/${v}/processing/payment-resources`,
            accessToken,
            method: 'POST',
            body: {
                paymentTool,
                clientInfo: {
                    fingerprint
                }
            }
        }));
