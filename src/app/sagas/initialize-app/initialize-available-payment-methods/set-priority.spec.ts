import { PaymentMethod as PaymentMethodState, PaymentMethodName, PaymentMethodGroupName } from 'checkout/state';
import { setPriority } from './set-priority';

it('should set priority', () => {
    const methodsState: PaymentMethodState[] = [
        { name: PaymentMethodName.ApplePay },
        { name: PaymentMethodName.GooglePay },
        { name: PaymentMethodName.SamsungPay },
        { name: PaymentMethodName.BankCard },
        { name: PaymentMethodName.DigitalWallet },
        {
            name: PaymentMethodGroupName.Terminals,
            children: [{ name: PaymentMethodName.Euroset }, { name: PaymentMethodName.ZotaPay }]
        }
    ];
    const actual = setPriority(methodsState);
    const expected: PaymentMethodState[] = [
        { name: PaymentMethodName.ApplePay, priority: 1 },
        { name: PaymentMethodName.GooglePay, priority: 7 },
        { name: PaymentMethodName.SamsungPay, priority: 8 },
        { name: PaymentMethodName.BankCard, priority: 2 },
        { name: PaymentMethodName.DigitalWallet, priority: 3 },
        {
            name: PaymentMethodGroupName.Terminals,
            priority: 4,
            children: [
                { name: PaymentMethodName.Euroset, priority: 5 },
                { name: PaymentMethodName.ZotaPay, priority: 6 }
            ]
        }
    ];
    expect(actual).toEqual(expected);
});
