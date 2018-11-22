import * as React from 'react';
import { MouseEventHandler } from 'react';
import { Locale } from 'checkout/locale';
import { block, container } from './other-payment-methods-link.scss';
import { Link } from 'checkout/components/ui/link';

export interface OtherPaymentMethodsLinkProps {
    locale: Locale;
    onClick: MouseEventHandler<any>;
}

export const OtherPaymentMethodsLink: React.FC<OtherPaymentMethodsLinkProps> = (props) => (
    <div className={block}>
        <div className={container}>
            <Link onClick={props.onClick}>{props.locale['form.payment.method.name.others.label']}</Link>
        </div>
    </div>
);
