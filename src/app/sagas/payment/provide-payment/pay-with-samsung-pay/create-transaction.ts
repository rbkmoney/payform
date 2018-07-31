import { Transaction } from 'checkout/backend/model';
import { guid } from 'checkout/utils';
import { AmountInfoState } from 'checkout/state';
import { AppConfig } from 'checkout/backend';

const getTransactionRequestBody = (totalAmount: number, currency: string, merchantName: string, serviceID: string) => ({
    callback: '0',
    paymentDetails: {
        service: {
            id: serviceID
        },
        orderNumber: guid(),
        protocol: {
            type: '3DS',
            version: '80'
        },
        amount: {
            currency,
            total: totalAmount
        },
        merchant: {
            name: merchantName
        }
    }
});

export async function createTransaction(appConfig: AppConfig, a: AmountInfoState): Promise<Transaction> {
    const {minorValue, currencyCode} = a;
    const {samsungPayMerchantName, samsungPayServiceID, wrapperEndpoint} = appConfig;
    const body = getTransactionRequestBody(minorValue / 100, currencyCode, samsungPayMerchantName, samsungPayServiceID);
    try {
        const res = await fetch(`${wrapperEndpoint}/samsungpay/api/v1/transaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Request-ID': guid()
            },
            body: JSON.stringify(body)
        });
        if (res.status >= 200 && res.status <= 300) {
            return await res.json();
        } else {
            throw {code: res.status};
        }
    } catch (e) {
        throw e;
    }
}
