import { css } from 'checkout/styled-components';
import { ThemeName } from './theme-name';
import { Theme } from './theme';
import { error, neutral, warning } from './common-palettes';

const palette = {
    White: '#fff'
};

const theme: Theme = {
    name: ThemeName.main,
    color: {
        neutral,
        primary: {
            0.1: '#c3f0dd',
            1: '#38cd8f',
            1.1: '#30b37c',
            1.2: '#29996a'
        },
        secondary: {
            0.9: '#685bff',
            1: '#8330ec',
            1.1: '#5248c9'
        },
        error,
        warning,
        info: {},
        success: {},
        focus: {
            1: '#685bff'
        },
        font: {
            infoBlock: palette.White
        }
    },
    gradients: {
        form: css`linear-gradient(45deg, #8330ec -20%, #685bff 90%)`,
        loader: [
            ['#8330EC', '0%'],
            ['#5A46F9', '38%'],
            ['#38CD8F', '100%']
        ]
    },
    font: {
        family: "'Roboto', sans-serif"
    },
    background: {
        image: true,
        color: css`linear-gradient(to top right, #9016f6, #6b35ff)`
    }
};

export default theme;
