import { createGlobalStyle } from 'checkout/styled-components';
import { device } from 'checkout/utils/device';

export const GlobalStyle = createGlobalStyle`
    body,
    html,
    #app {
        margin: 0;
        position: relative;
        height: auto;
        min-height: 100%;
        width: 100%;
        min-width: 320px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        &._loading {
            height: 100%;
        }

        @media ${device.desktop} {
            height: 100%;
            min-width: 680px;
        }
    }
    
    * {
        font-family: ${({ theme }) => theme.font.family};
    }
`;
