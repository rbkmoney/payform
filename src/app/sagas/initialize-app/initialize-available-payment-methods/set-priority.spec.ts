import { PaymentMethod as PaymentMethodState, PaymentMethodName } from 'checkout/state';
import { setPriority } from './set-priority';

it('should set priority', () => {
    const methodsState: PaymentMethodState[] = [
        { name: PaymentMethodName.ApplePay },
        { name: PaymentMethodName.GooglePay },
        { name: PaymentMethodName.SamsungPay },
        { name: PaymentMethodName.YandexPay },
        { name: PaymentMethodName.BankCard },
        { name: PaymentMethodName.DigitalWallet },
        { name: PaymentMethodName.Euroset },
        { name: PaymentMethodName.Uzcard },
        { name: PaymentMethodName.MobileCommerce },
        { name: PaymentMethodName.QPS }
    ];
    const actual = setPriority(methodsState);
    const expected: PaymentMethodState[] = [
        { name: PaymentMethodName.ApplePay, priority: 3 },
        { name: PaymentMethodName.GooglePay, priority: 6 },
        { name: PaymentMethodName.SamsungPay, priority: 7 },
        { name: PaymentMethodName.YandexPay, priority: 2 },
        { name: PaymentMethodName.BankCard, priority: 1 },
        { name: PaymentMethodName.DigitalWallet, priority: 4 },
        { name: PaymentMethodName.Euroset, priority: 5 },
        { name: PaymentMethodName.Uzcard, priority: 10 },
        { name: PaymentMethodName.MobileCommerce, priority: 9 },
        { name: PaymentMethodName.QPS, priority: 8 }
    ];
    expect(actual).toEqual(expected);
});
