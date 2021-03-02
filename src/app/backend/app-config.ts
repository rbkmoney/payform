import { ThemeName } from 'checkout/themes';

export class AppConfig {
    capiEndpoint: string;
    wrapperEndpoint: string;
    applePayMerchantID: string;
    googlePayMerchantID: string;
    googlePayGatewayMerchantID: string;
    samsungPayMerchantName: string;
    samsungPayServiceID: string;
    yandexPayMerchantID: string;
    yandexPayGatewayMerchantID: string;
    brandless: boolean;
    fixedTheme: ThemeName;
}
