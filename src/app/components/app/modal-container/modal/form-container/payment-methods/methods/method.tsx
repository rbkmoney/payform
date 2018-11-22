import styled from 'checkout/styled-components';
import { MethodSimple } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/mthod-simple';
import { Description } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/description';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';
import { Icon } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/icon';

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

        ${Icon} svg path {
            fill: #fff;
        }
    }

    :active {
        border-color: ${({ theme }) => theme.color.primary[0.8]};
        background-color: ${({ theme }) => theme.color.primary[0.8]};
    }
`;
