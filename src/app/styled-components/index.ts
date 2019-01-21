import * as styledComponents from 'styled-components';

import { Theme } from '../themes';

const {
    default: styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider,
    withTheme
}: styledComponents.ThemedStyledComponentsModule<Theme> = styledComponents as any;

export { css, createGlobalStyle, keyframes, ThemeProvider, withTheme };
export default styled;
