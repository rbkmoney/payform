import { css } from 'checkout/styled-components';
import { ThemeName } from './theme-name';
import { Theme } from './theme';

const theme: Theme = {
    name: ThemeName.main,
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
            0.1: '#c3f0dd',
            1: '#38cd8f',
            1.1: '#30b37c',
            1.2: '#29996a'
        },
        secondary: {
            0.7: '#9088dd',
            0.9: '#685bff',
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
            1: '#685bff'
        }
    },
    gradients: {
        form: css`linear-gradient(45deg, #8330ec -20%, #685bff 90%)`,
        bg: css`linear-gradient(to top right, #9016f6, #6b35ff)`,
        loader: [
            ['#8330EC', '0%'],
            ['#5A46F9', '38%'],
            ['#38CD8F', '100%']
        ]
    },
    font: {
        family: "'Roboto', sans-serif"
    }
};

export default theme;
