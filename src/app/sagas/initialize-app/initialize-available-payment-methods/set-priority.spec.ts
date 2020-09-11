import { PaymentMethod as PaymentMethodState, PaymentMethodName } from 'checkout/state';
import { setPriority } from './set-priority';

it('should set priority', () => {
    const methodsState: PaymentMethodState[] = [
        { name: PaymentMethodName.ApplePay },
        { name: PaymentMethodName.GooglePay },
        { name: PaymentMethodName.SamsungPay },
        { name: PaymentMethodName.BankCard },
        { name: PaymentMethodName.DigitalWallet },
        { name: PaymentMethodName.Euroset },
        { name: PaymentMethodName.MobileCommerce },
        { name: PaymentMethodName.QPS }
    ];
    const actual = setPriority(methodsState);
    const expected: PaymentMethodState[] = [
        { name: PaymentMethodName.ApplePay, priority: 1 },
        { name: PaymentMethodName.GooglePay, priority: 5 },
        { name: PaymentMethodName.SamsungPay, priority: 6 },
        { name: PaymentMethodName.BankCard, priority: 2 },
        { name: PaymentMethodName.DigitalWallet, priority: 3 },
        { name: PaymentMethodName.Euroset, priority: 4 },
        { name: PaymentMethodName.MobileCommerce, priority: 8 },
        { name: PaymentMethodName.QPS, priority: 7 }
    ];
    expect(actual).toEqual(expected);
});
