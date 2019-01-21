import * as React from 'react';
import { Omit } from 'react-redux';

import { ChevronLeft } from 'checkout/components';
import styled from 'checkout/styled-components';

const ChevronBackWrapper = styled.div`
    g {
        stroke: ${({ theme }) => theme.color.primary[1]};
    }
    :hover {
        g {
            stroke: ${({ theme }) => theme.color.primary[1.2]};
        }
    }
`;

export const ChevronBack: React.FC<Omit<React.Props<typeof ChevronBackWrapper>, 'ref'>> = (props) => (
    <ChevronBackWrapper {...props}>
        <ChevronLeft />
    </ChevronBackWrapper>
);
