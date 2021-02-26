import * as React from 'react';

import { FormName, PaymentMethodName, TokenProviderFormInfo } from 'checkout/state';
import { BankCardTokenProvider } from 'checkout/backend';
import { MethodProps } from './method-props';
import { MethodSimple } from './mthod-simple';
import { Method } from './method';
import { Icon } from './icon/icon';
import { Title } from './title';

const toTokenProvider = (props: MethodProps) =>
    props.setFormInfo(new TokenProviderFormInfo(BankCardTokenProvider.yandexpay, FormName.paymentMethods));

const TokenProviderFormLink: React.FC<MethodProps> = (props) => (
    <Method onClick={toTokenProvider.bind(null, props)} id="yandex-pay-payment-method">
        <Icon name="yandex-pay" />
        <Title>{props.locale['form.payment.method.name.yandex.pay.label']}</Title>
    </Method>
);

const pay = (props: MethodProps) => props.pay({ method: PaymentMethodName.YandexPay });

const YandexPayButton: React.FC<MethodProps> = (props) => (
    <MethodSimple onClick={pay.bind(null, props)} id="yandex-pay-payment-method">
        <svg height="40" width="100%" viewBox="0 0 100 40" fill="none">
            <path
                d="M20 40c11.045 0 20-8.955 20-20S31.045 0 20 0 0 8.955 0 20s8.955 20 20 20zM16.997 8.038c1.613-.571 3.438-.856 5.475-.856h4.913V33.07h-4.633v-8.95h-2.807l-3.908 8.958h-5.054l4.539-10.031c-.912-.5-1.614-1.072-2.175-1.787-.562-.713-1.054-1.5-1.334-2.43a9.843 9.843 0 01-.421-2.93v-.283c0-2.002.491-3.645 1.473-4.86.983-1.287 2.247-2.145 3.932-2.717v-.002zm1.825 11.865c.771.285 1.683.429 2.736.429h1.194v-9.505h-1.264c-1.545 0-2.806.356-3.79 1.071-.983.715-1.475 1.859-1.475 3.574v.143c0 1.215.282 2.143.704 2.858.49.644 1.121 1.144 1.895 1.43z"
                fill="#FF3815"
            />
            <path
                d="M50.002 10h6.59c2.547 0 4.514.492 5.898 1.478 1.402.986 2.104 2.575 2.104 4.77 0 1.17-.193 2.185-.58 3.039a5.39 5.39 0 01-1.607 2.12c-.701.54-1.55.94-2.547 1.2a13.158 13.158 0 01-3.324.39h-2.575v7.001H50V10h.002zm3.96 3.346v6.36h2.574c1.293 0 2.29-.243 2.99-.726.72-.503 1.08-1.359 1.08-2.567 0-1.06-.34-1.832-1.023-2.315-.665-.502-1.662-.752-2.99-.752H53.96zM71.915 10h4.791l6.978 19.998h-3.988l-1.688-4.853h-8.031L68.287 30H64.94l6.978-19.998-.002-.002zm4.958 11.826l-2.88-8.256-2.852 8.256h5.732zm16.728-.278V30h-3.987v-8.425L83.162 10h4.375l4.321 8.116L96.318 10H100l-6.396 11.547-.002.001z"
                fill="#000"
            />
        </svg>
    </MethodSimple>
);

export const YandexPay: React.FC<MethodProps> = (props) =>
    props.amountPrefilled && props.emailPrefilled ? (
        <YandexPayButton {...props} />
    ) : (
        <TokenProviderFormLink {...props} />
    );
