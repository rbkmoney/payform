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

export const shake = keyframes`
    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
`;

export const fadein = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const fadeout = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

export const popup = keyframes`
    from {
        transform: perspective(1000px) rotate3d(0, 1, 0, 75deg) translateY(300px);
        opacity: 0;
    }
    to {
        transform: perspective(1000px) rotate3d(0, 1, 0, 0) translateY(0);
        opacity: 1;
    }
`;

export const popout = keyframes`
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    25% {
        transform: translateY(-30px);
        opacity: 1;
    }
    100% {
        transform: translateY(500px);
        opacity: 0;
    }
`;
