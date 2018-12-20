import styled from 'checkout/styled-components';

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
