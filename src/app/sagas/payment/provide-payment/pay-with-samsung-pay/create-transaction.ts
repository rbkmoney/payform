import { Transaction } from 'checkout/backend/model';
import { guid } from 'checkout/utils';

export async function createTransaction(totalAmount: number, currency: string, merchantName: string, serviceID: string, wrapperEndpoint: string): Promise<Transaction> {
    try {
        const res = await fetch(`${wrapperEndpoint}/samsungpay/api/v1/transaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Request-ID': guid()
            },
            body: JSON.stringify({
                callback: '0',
                paymentDetails: {
                    service: {
                        id: serviceID
                    },
                    orderNumber: '123',
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
            })
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
