import { keyframes } from 'checkout/styled-components/index';

export const growth = keyframes`
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
`;

export const spin = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;
