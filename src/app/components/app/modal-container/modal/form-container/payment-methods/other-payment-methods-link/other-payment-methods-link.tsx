import * as React from 'react';
import { MouseEventHandler } from 'react';
import { Locale } from 'checkout/locale';
import { block, container, link } from './other-payment-methods-link.scss';

export interface OtherPaymentMethodsLinkProps {
    locale: Locale;
    onClick: MouseEventHandler<any>;
}

export const OtherPaymentMethodsLink: React.SFC<OtherPaymentMethodsLinkProps> = (props) => (
    <div className={block}>
        <div className={container}>
            <a className={link} onClick={props.onClick}>
                {props.locale['form.payment.method.name.others.label']}
            </a>
        </div>
    </div>
);
