import * as styledComponents from 'styled-components';

import { Theme } from '../themes';

const {
    default: styled,
    // @ts-ignore
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider,
    withTheme
}: styledComponents.ThemedStyledComponentsModule<Theme> = styledComponents;

export { css, createGlobalStyle, keyframes, ThemeProvider, withTheme };
export default styled;
