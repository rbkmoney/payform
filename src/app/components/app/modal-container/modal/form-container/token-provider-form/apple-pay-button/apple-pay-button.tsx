import styled from 'checkout/styled-components';

export const ApplePayButton = styled.button.attrs({
    type: 'button',
    id: 'apple-pay-button'
})`
    cursor: pointer;
    width: 100%;
    padding: 22px;
    transition: all 0.3s;
    -webkit-appearance: -apple-pay-button;
    // -apple-pay-button-style: white-outline;
    -apple-pay-button-style: black;
    margin-top: 20px;
`;
