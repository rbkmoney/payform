import { css } from 'checkout/styled-components';
import { ThemeName } from './theme-name';

export interface Theme {
    name: ThemeName;
    color: {
        neutral: {
            0: string;
            0.1: string;
            0.2: string;
            0.3: string;
            0.8: string;
            0.9: string;
            1: string;
        };
        primary: {
            0.1: string;
            1: string;
            1.1: string;
            1.2: string;
        };
        secondary: {
            0.7: string;
            0.9: string;
            1: string;
            1.1: string;
        };
        error: {
            1: string;
        };
        warning: {
            1: string;
        };
        info: {};
        success: {};
        focus: {
            1: string;
        };
    };
    gradients: {
        form: ReturnType<typeof css>;
        bg: ReturnType<typeof css>;
        loader: string[][];
    };
    font: {
        family: string;
    };
}
