import { PaymentResource } from 'checkout/backend/model';
import v from 'checkout/backend/capi-version';
import { fetchCapi } from 'checkout/backend/fetch-capi';

export const createBinding = (
    capiEndpoint: string,
    accessToken: string,
    customerID: string,
    paymentResource: PaymentResource
) =>
    fetchCapi({
        method: 'POST',
        endpoint: `${capiEndpoint}/${v}/processing/customers/${customerID}/bindings`,
        accessToken,
        body: { paymentResource }
    });
