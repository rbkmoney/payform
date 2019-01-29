import { css } from 'checkout/styled-components';
import { ThemeName } from './theme-name';
import { Theme } from './theme';

const theme: Theme = {
    name: ThemeName.coral,
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
            0.7: '#b992d1',
            0.9: '#d1658e',
            1: '#8330ec',
            1.1: '#9b4f69'
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
        form: css`linear-gradient(45deg, #8330ec -20%, #ff8454 90%)`,
        bg: css`linear-gradient(to top right, #9016f6, #b85c76)`,
        loader: [['#7854CD', '0%'], ['#FF8353', '100%']]
    },
    font: {
        family: "'Roboto', sans-serif"
    }
};

export default theme;
