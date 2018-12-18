import coral from './coral';
import main from './main';
import { Theme } from './theme';

export const themes = {
    coral,
    main
};

export const themesNames: { [name in keyof typeof themes]: string } = Object.keys(themes).reduce(
    (accThemeNames, name) => {
        accThemeNames[name] = name;
        return accThemeNames;
    },
    {} as any
);

export const DEFAULT_THEME = themes.main;

export interface WithThemeProps {
    theme: Theme;
}

export { Theme };
