import { PaymentMethod as PaymentMethodState } from 'checkout/state';
import { setPriority } from './set-priority';

it('should set priority', () => {
    const methodsState = [
        {name: 'ApplePay'},
        {name: 'GooglePay'},
        {name: 'SamsungPay'},
        {name: 'BankCard'},
        {name: 'DigitalWallet'},
        {name: 'PaymentTerminal'}
    ] as PaymentMethodState[];
    const actual = setPriority(methodsState);
    const expected = [
        {name: 'ApplePay', priority: 1},
        {name: 'GooglePay', priority: 2},
        {name: 'SamsungPay', priority: 3},
        {name: 'BankCard', priority: 4},
        {name: 'DigitalWallet', priority: 5},
        {name: 'PaymentTerminal', priority: 6}
    ];
    expect(actual).toEqual(expected);
});
