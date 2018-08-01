import { PaymentMethod as PaymentMethodState } from 'checkout/state';
import { setPriority } from './set-priority';

it('should set priority', () => {
    const methodsState = [
        { name: 'ApplePay' },
        { name: 'GooglePay' },
        { name: 'SamsungPay' },
        { name: 'BankCard' },
        { name: 'DigitalWallet' },
        { name: 'PaymentTerminal' }
    ] as PaymentMethodState[];
    const actual = setPriority(methodsState);
    const expected = [
        { name: 'ApplePay', priority: 1 },
        { name: 'GooglePay', priority: 5 },
        { name: 'SamsungPay', priority: 6 },
        { name: 'BankCard', priority: 2 },
        { name: 'DigitalWallet', priority: 3 },
        { name: 'PaymentTerminal', priority: 4 }
    ];
    expect(actual).toEqual(expected);
});
