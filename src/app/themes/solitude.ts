import { css } from 'checkout/styled-components';
import { ThemeName } from './theme-name';
import { Theme } from './theme';
import { error, neutral, warning } from './common-palettes';

const palette = {
    Fog: '#D6CBFF',
    Solitude: '#E7F6FF',
    PastelPink: '#FFD1E4',
    Silver: '#C7C7C7',
    Black: '#000000'
};

const theme: Theme = {
    name: ThemeName.solitude,
    color: {
        neutral,
        primary: {
            0.1: palette.Black,
            1: palette.Black,
            1.1: palette.Black,
            1.2: palette.Black
        },
        secondary: {
            0.7: palette.Silver,
            0.9: palette.Black,
            1: palette.Black,
            1.1: palette.Black
        },
        error,
        warning,
        info: {},
        success: {
            1: palette.Black
        },
        focus: {
            1: palette.Black
        },
        font: {
            infoBlock: palette.Black
        }
    },
    gradients: {
        form: css`linear-gradient(-45deg, ${palette.Fog} 0%, ${palette.Solitude} 50%, ${palette.PastelPink} 100%)`,
        bg: css`
            ${palette.Black}
        `,
        loader: [
            [palette.Silver, '0%'],
            [palette.Black, '100%']
        ]
    },
    font: {
        family: "'Roboto', sans-serif"
    }
};

export default theme;
