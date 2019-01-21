import * as React from 'react';
import { MouseEventHandler } from 'react';

import { Locale } from 'checkout/locale';
import { Link } from 'checkout/components/ui/link';
import styled from 'checkout/styled-components';

const Block = styled.div`
    display: flex;
`;

const Container = styled.div`
    display: inline-block;
    margin: auto;
    margin-top: 22px;
`;

export interface OtherPaymentMethodsLinkProps {
    locale: Locale;
    onClick: MouseEventHandler<any>;
}

export const OtherPaymentMethodsLink: React.FC<OtherPaymentMethodsLinkProps> = (props) => (
    <Block>
        <Container>
            <Link onClick={props.onClick}>{props.locale['form.payment.method.name.others.label']}</Link>
        </Container>
    </Block>
);
