import { CardFormFlowItem } from 'checkout/form-flow';
import { StepStatus } from 'checkout/lifecycle';
import { FormContainerProps } from '../../form-container-props';
import { PaymentToolType } from 'checkout/backend';
import { Shortened } from '../../form-flow-resolver';

const replaceSpaces = (str: string): string => str.replace(/\s+/g, '');

const createPaymentResource = (p: FormContainerProps, i: CardFormFlowItem) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const token = p.model.invoiceAccessToken;
    const cardNumber = replaceSpaces(i.values.cardNumber);
    const expDate = replaceSpaces(i.values.expireDate);
    const paymentTool = {
        paymentToolType: PaymentToolType.CardData,
        cardNumber,
        expDate,
        cvv: i.values.secureCode,
        cardHolder: i.values.cardHolder
    };
    p.createPaymentResource(endpoint, token, paymentTool);
};

export const resolvePaymentResource = (fn: Shortened, p: FormContainerProps, i: CardFormFlowItem) => {
    const done = !!p.model.paymentResource;
    const start = p.cardPayment.createInvoice === StepStatus.done;
    fn('createPaymentResource', createPaymentResource.bind(null, p, i), done, start);
};
