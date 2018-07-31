import {
    communicatorInstanceName,
    Event,
    ResultData,
    Type,
    URIPath
} from '../../../../../constants/samsung-pay-communicator';
import { Transaction } from 'checkout/backend/model';
import { listen } from 'cross-origin-communicator';
import { detectLocale } from '../../../../../locale/detect-locale';
import { serialize } from '../../../../../initializer/popup-initializer';

export async function getResultData(transaction: Transaction, serviceId: string, locale: string): Promise<ResultData> {
    const connectTransport = await listen(communicatorInstanceName, 5000);
    return await new Promise<ResultData>((res) => {
        const URL = `${window.location.origin}${URIPath}`;
        connectTransport.on(Event.CONNECT, async () => {
            connectTransport.emit(Event.CONNECT, {
                transactionId: transaction.id,
                href: transaction.href,
                serviceId,
                callbackURL: URL,
                cancelURL: `${URL}?${serialize({type: Type.ERROR})}`,
                countryCode: detectLocale(locale),
                publicKeyMod: transaction.encInfo.mod,
                publicKeyExp: transaction.encInfo.exp,
                keyId: transaction.encInfo.keyId
            });
            connectTransport.destroy();
            const resultTransport = await listen(communicatorInstanceName);
            resultTransport.on(Event.RESULT, (data: ResultData) => {
                res(data);
            });
        });
    });
}
