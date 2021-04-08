import styled from 'checkout/styled-components';
import { MethodSimple } from './mthod-simple';
import { Description } from './description';
import { Title } from './title';
import { Icon } from './icon/icon';

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

        ${Icon} svg path[fill="white"] {
            fill: ${({ theme }) => theme.color.primary[1]};
        }
    }

    :active {
        border-color: ${({ theme }) => theme.color.primary[1.1]};
        background-color: ${({ theme }) => theme.color.primary[1.1]};
    }
`;
