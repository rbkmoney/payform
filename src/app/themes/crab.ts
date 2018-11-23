import Theme from './theme';
import { css } from 'checkout/styled-components';

const theme: Theme = {
    name: 'crab',
    color: {
        neutral: {
            0: '#fff',
            0.2: '#bababa',
            0.3: '#afafaf',
            0.8: '#333',
            0.9: '#292929',
            1: '#000'
        },
        primary: {
            0.1: '#ff8454',
            1: '#d1658e',
            1.1: '#b85c76',
            1.2: '#9b4f69'
        },
        secondary: {
            0.7: '#9088dd',
            0.9: '#8330ec',
            1: '#8330ec',
            1.1: '#5248c9'
        },
        error: {
            1: '#e75542'
        },
        warning: {
            1: '#ffe05c'
        },
        info: {},
        success: {},
        focus: {
            1: '#d1658e'
        }
    },
    gradients: {
        bg: css`linear-gradient(45deg, #8330ec -20%, #ff8454 90%)`
    },
    font: {
        family: "'Roboto', sans-serif"
    }
};

export default theme;
