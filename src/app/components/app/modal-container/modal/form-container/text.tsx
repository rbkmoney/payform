import styled from 'checkout/styled-components';

export const Text = styled.p<{ centered?: boolean }>`
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 30px;
    line-height: 20px;
    text-align: ${(props) => (props.centered ? 'center' : undefined)};
`;
