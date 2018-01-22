import { PaymentToolDetails } from './payment-tool-details';
import { DigitalWalletDetails, DigitalWalletDetailsType } from './digital-wallet-details';
import { PaymentToolDetailsType } from './payment-tool-details-type';
import { applyMixins } from 'checkout/utils';

export class PaymentToolDetailsDigitalWallet implements PaymentToolDetails, DigitalWalletDetails {
    detailsType: PaymentToolDetailsType;
    digitalWalletDetailsType: DigitalWalletDetailsType;
}

applyMixins(PaymentToolDetailsDigitalWallet, [PaymentToolDetails, DigitalWalletDetails]);
