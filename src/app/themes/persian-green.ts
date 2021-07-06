import { css } from 'checkout/styled-components';
import { ThemeName } from './theme-name';
import { Theme } from './theme';
import { error, neutral, warning } from './common-palettes';

const palette = {
    Pelorous: '#36BABA',
    PersianGreen: '#00A69B',
    Teal: '#008E89',
    Wistful: '#9CA8CF',
    Smalt: '#003A8E',
    BayOfMany: '#213980'
};

const theme: Theme = {
    name: ThemeName.persianGreen,
    color: {
        neutral,
        primary: {
            0.1: palette.PersianGreen,
            1: palette.PersianGreen,
            1.1: palette.Pelorous,
            1.2: palette.Teal
        },
        secondary: {
            0.7: palette.Wistful,
            0.9: palette.PersianGreen,
            1: palette.Smalt,
            1.1: palette.Teal
        },
        error,
        warning,
        info: {},
        success: {
            1: palette.PersianGreen
        },
        focus: {
            1: palette.PersianGreen
        }
    },
    gradients: {
        form: css`linear-gradient(45deg, ${palette.BayOfMany} -20%, ${palette.PersianGreen} 90%)`,
        bg: css`linear-gradient(to top right, ${palette.Smalt}, ${palette.Pelorous})`,
        loader: [
            [palette.Pelorous, '0%'],
            [palette.BayOfMany, '100%']
        ]
    },
    font: {
        family: "'Roboto', sans-serif"
    }
};

export default theme;
