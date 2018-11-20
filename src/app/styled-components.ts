import * as styledComponents from 'styled-components';

import { Theme } from './themes';

const {
    default: styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider
} = (styledComponents as any) as styledComponents.ThemedStyledComponentsModule<Theme>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
