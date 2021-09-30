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
        <svg width="100%" height="40" viewBox="0 0 60 24" fill="none">
            <rect width="24.0254" height="24" rx="12" fill="#FC3F1D" />
            <path
                d="M13.5515 6.79914H12.4416C10.4067 6.79914 9.33639 7.8287 9.33639 9.34665C9.33639 11.0626 10.0763 11.8678 11.5959 12.8973L12.8512 13.7421L9.2439 19.1275H6.54834L9.78565 14.3097C7.92255 12.9765 6.87868 11.683 6.87868 9.49184C6.87868 6.74634 8.79464 4.87201 12.4284 4.87201H16.0356V19.1143H13.5515V6.79914Z"
                fill="white"
            />
            <path
                d="M30.262 4.68298V19H32.7572V13.8912H33.9739C37.2321 13.8912 39.3149 12.3874 39.3149 9.21498C39.3149 6.33098 37.3765 4.68298 33.9945 4.68298H30.262ZM33.9945 11.9548H32.7572V6.61938H34.077C35.8299 6.61938 36.7785 7.42278 36.7785 9.21498C36.7785 11.0896 35.7267 11.9548 33.9945 11.9548Z"
                fill="black"
            />
            <path
                d="M49.9373 19L46.1635 4.68298H43.0083L39.2139 19H41.3586L42.1629 15.8688H46.5553L47.3389 19H49.9373ZM42.6578 13.9324L44.3694 7.29918L46.0604 13.9324H42.6578Z"
                fill="black"
            />
            <path
                d="M59.9999 4.68298H57.6697L54.7207 10.657L51.7924 4.68298H49.1116L53.3185 12.8818V19H55.8137V12.8818L59.9999 4.68298Z"
                fill="black"
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
