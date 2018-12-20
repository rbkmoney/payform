import styled from 'checkout/styled-components';

export const MethodSimple = styled.li`
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.color.neutral[0.2]};
    padding: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-bottom: 10px;
    transition: all 0.3s;
    cursor: pointer;
`;
