import * as React from 'react';

import styled from 'checkout/styled-components';
import ApplePay from './apple-pay.svg';
import BankCard from './bank-card.svg';
import GooglePay from './google-pay.svg';
import SamsungPay from './samsung-pay.svg';
import Terminals from './terminals.svg';
import Wallets from './wallets.svg';

const IconClasses = {
    'apple-pay': ApplePay,
    'google-pay': GooglePay,
    'samsung-pay': SamsungPay,
    'bank-card': BankCard,
    terminals: Terminals,
    wallets: Wallets
};

type name = keyof typeof IconClasses;

export const Icon = styled<React.FC<{ name: name; className?: string }>>((props) => {
    const IconClass = IconClasses[props.name];
    return (
        <div className={props.className}>
            <IconClass />
        </div>
    );
})`
    height: 40px;
    width: 40px;
    margin-right: 15px;

    path {
        fill: ${({ theme }) => theme.color.secondary[0.9]};
    }
`;
