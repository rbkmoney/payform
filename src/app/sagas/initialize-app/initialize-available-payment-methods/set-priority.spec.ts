import { PaymentMethod as PaymentMethodState, PaymentMethodName, PaymentMethodGroupName } from 'checkout/state';
import { setPriority } from './set-priority';

it('should set priority', () => {
    const methodsState: PaymentMethodState[] = [
        { name: PaymentMethodName.ApplePay },
        { name: PaymentMethodName.GooglePay },
        { name: PaymentMethodName.SamsungPay },
        { name: PaymentMethodName.BankCard },
        { name: PaymentMethodName.DigitalWallet },
        { name: PaymentMethodGroupName.Terminals, children: [{ name: PaymentMethodName.Euroset }] }
    ];
    const actual = setPriority(methodsState);
    const expected: PaymentMethodState[] = [
        { name: PaymentMethodName.ApplePay, priority: 1 },
        { name: PaymentMethodName.GooglePay, priority: 6 },
        { name: PaymentMethodName.SamsungPay, priority: 7 },
        { name: PaymentMethodName.BankCard, priority: 2 },
        { name: PaymentMethodName.DigitalWallet, priority: 3 },
        {
            name: PaymentMethodGroupName.Terminals,
            priority: 4,
            children: [{ name: PaymentMethodName.Euroset, priority: 5 }]
        }
    ];
    expect(actual).toEqual(expected);
});
