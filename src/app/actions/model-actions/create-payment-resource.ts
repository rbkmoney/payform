import { Dispatch } from 'redux';
import { TypeKeys, AbstractAction, SetErrorAction } from '../';
import { PaymentTool } from 'checkout/backend/model';
import { createPaymentResource as capiRequest, PaymentResource } from 'checkout/backend';

export interface CreatePaymentResource extends AbstractAction<PaymentResource> {
    type: TypeKeys.CREATE_PAYMENT_RESOURCE;
    payload: PaymentResource;
}

export type CreatePaymentResourceDispatch = (dispatch: Dispatch<CreatePaymentResource | SetErrorAction>) => void;

export const createPaymentResource = (capiEndpoint: string, accessToken: string, paymentTool: PaymentTool): CreatePaymentResourceDispatch =>
    (dispatch) => capiRequest(capiEndpoint, accessToken, paymentTool)
        .then((paymentResource) => dispatch({
            type: TypeKeys.CREATE_PAYMENT_RESOURCE,
            payload: paymentResource
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));
