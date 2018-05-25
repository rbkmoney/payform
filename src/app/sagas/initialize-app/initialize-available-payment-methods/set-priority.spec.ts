import { PaymentMethod as PaymentMethodState } from 'checkout/state';
import { setPriority } from './set-priority';

it('should set priority', () => {
    const methodsState = [
        {name: 'ApplePay'},
        {name: 'SamsungPay'},
        {name: 'GooglePay'},
        {name: 'BankCard'},
        {name: 'DigitalWallet'},
        {name: 'PaymentTerminal'}
    ] as PaymentMethodState[];
    const actual = setPriority(methodsState);
    const expected = [
        {name: 'ApplePay', priority: 1},
        {name: 'SamsungPay', priority: 1},
        {name: 'GooglePay', priority: 2},
        {name: 'BankCard', priority: 3},
        {name: 'DigitalWallet', priority: 4},
        {name: 'PaymentTerminal', priority: 5}
    ];
    expect(actual).toEqual(expected);
});
