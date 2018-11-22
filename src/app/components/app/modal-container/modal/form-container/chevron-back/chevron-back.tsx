import * as React from 'react';

import { ChevronLeft } from 'checkout/components';
import styled from 'checkout/styled-components';

export const ChevronBack = styled<
    React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>
>((props) => (
    <div {...props}>
        <ChevronLeft />
    </div>
))`
    g {
        stroke: ${({ theme }) => theme.color.primary[1]};
    }

    :hover {
        g {
            stroke: ${({ theme }) => theme.color.primary[0.9]};
        }
    }
`;
