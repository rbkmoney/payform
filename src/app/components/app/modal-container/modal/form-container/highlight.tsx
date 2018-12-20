import styled from 'checkout/styled-components';

export const Highlight = styled.span`
    background: ${({ theme }) => theme.color.warning[1]};
    border-radius: 3px;
    padding: 0 3px;
    margin: 0 3px;
`;
