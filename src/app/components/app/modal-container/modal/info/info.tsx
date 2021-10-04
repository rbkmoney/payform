import * as React from 'react';
import { connect } from 'react-redux';

import { State } from 'checkout/state';
import { formatAmount, FormattedAmount } from 'checkout/utils';
import { Locale } from 'checkout/locale';
import { device } from 'checkout/utils/device';
import styled from 'checkout/styled-components';
import { fadein } from 'checkout/styled-components/animations';

const InfoWrapper = styled.div`
    padding: 30px 25px;

    @media ${device.desktop} {
        padding: 0;
        width: 230px;
        margin-right: 30px;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

const CompanyName = styled.h4`
    display: none;
    font-weight: 500;
    font-size: 16px;
    color: ${({ theme }) => theme.color.font.infoBlock};
    letter-spacing: 0;
    line-height: 20px;
    margin: 0 0 30px;

    @media ${device.desktop} {
        display: block;
    }
`;

const Amount = styled.h1`
    font-weight: 500;
    font-size: 30px;
    color: ${({ theme }) => theme.color.font.infoBlock};
    letter-spacing: 0;
    line-height: 35px;
    margin: 0 0 20px;
    animation: ${fadein} 0.5s;
`;

const Order = styled.div`
    font-weight: 900;
    font-size: 11px;
    color: ${({ theme }) => theme.color.font.infoBlock};
    opacity: 0.4;
    letter-spacing: 2px;
    line-height: 15px;
    margin-bottom: 5px;
    text-transform: uppercase;
`;

const ProductDescription = styled.div`
    font-weight: 500;
    font-size: 16px;
    color: ${({ theme }) => theme.color.font.infoBlock};
    letter-spacing: 0;
    line-height: 20px;
    margin-bottom: 20px;
`;

const Email = styled.div`
    font-weight: 500;
    font-size: 16px;
    color: ${({ theme }) => theme.color.font.infoBlock};
    letter-spacing: 0;
    line-height: 20px;
    margin-bottom: 20px;
`;

export interface InfoProps {
    locale: Locale;
    name: string;
    description: string;
    email: string;
    formattedAmount: FormattedAmount;
}

const mapStateToProps = (s: State) => {
    const {
        config: { initConfig, locale }
    } = s;
    return {
        locale,
        name: initConfig.name,
        description: initConfig.description,
        email: initConfig.email,
        formattedAmount: formatAmount(s.amountInfo)
    };
};

const InfoDef: React.FC<InfoProps> = (props) => {
    const { formattedAmount, locale, name, description, email } = props;
    return (
        <InfoWrapper>
            <div>
                {name ? <CompanyName id="company-name-label">{name}</CompanyName> : false}
                {formattedAmount ? (
                    <Amount>
                        {formattedAmount.value}
                        <span>
                            &nbsp;
                            {formattedAmount.symbol}
                        </span>
                    </Amount>
                ) : (
                    false
                )}
                {description ? (
                    <div>
                        <Order>{locale['info.order.label']}</Order>
                        <ProductDescription id="product-description">{description}</ProductDescription>
                    </div>
                ) : (
                    false
                )}
                {email ? (
                    <div>
                        <Order>{locale['info.email.label']}</Order>
                        <Email>{email}</Email>
                    </div>
                ) : (
                    false
                )}
            </div>
        </InfoWrapper>
    );
};

export const Info = connect(mapStateToProps)(InfoDef);
