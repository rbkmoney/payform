import styled from 'checkout/styled-components';
import { MethodSimple } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/mthod-simple';
import { Description } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/description';

export const Title = styled.div`
    font-weight: 900;
    text-transform: uppercase;
    font-size: 11px;
    color: ${({ theme }) => theme.color.secondary[0.9]};
    letter-spacing: 2px;
    line-height: 15px;
    padding: 0;
    margin: 0;
    display: inline-table;
`;

export const Icon = styled.div`
    height: 40px;
    width: 40px;
    margin-right: 15px;
`;

export const Method = styled(MethodSimple)`
    :last-child {
        margin-bottom: 0;
    }

    :hover {
        border-color: ${({ theme }) => theme.color.primary[1]};
        background-color: ${({ theme }) => theme.color.primary[1]};

        ${Title} {
            color: #fff;
        }

        ${Description} {
            color: #fff;
        }

        .icon svg path {
            fill: #fff;
        }
    }

    :active {
        border-color: ${({ theme }) => theme.color.primary[0.8]};
        background-color: ${({ theme }) => theme.color.primary[0.8]};
    }
`;
