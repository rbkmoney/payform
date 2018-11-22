import styled from 'checkout/styled-components';

export const Description = styled.p`
    font-weight: 400;
    font-size: 13px;
    font-style: italic;
    color: ${({ theme }) => theme.color.neutral[0.8]};
    letter-spacing: 0.1px;
    line-height: 17px;
    padding: 4px 0 0;
    margin: 0;
`;
