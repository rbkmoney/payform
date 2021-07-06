import { css } from 'checkout/styled-components';
import { ThemeName } from './theme-name';
import { Theme } from './theme';
import { error, neutral, warning } from './common-palettes';

const theme: Theme = {
    name: ThemeName.coral,
    color: {
        neutral,
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
        error,
        warning,
        info: {},
        success: {
            1: '#d1658e'
        },
        focus: {
            1: '#d1658e'
        }
    },
    gradients: {
        form: css`linear-gradient(45deg, #8330ec -20%, #ff8454 90%)`,
        bg: css`linear-gradient(to top right, #9016f6, #b85c76)`,
        loader: [
            ['#7854CD', '0%'],
            ['#FF8353', '100%']
        ]
    },
    font: {
        family: "'Roboto', sans-serif"
    }
};

export default theme;
