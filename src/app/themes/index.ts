import crab from './crab';
import main from './main';
import Theme from './theme';

export const themes = [crab, main].reduce(
    (accumulatedThemes, theme) => {
        accumulatedThemes[theme.name] = theme;
        return accumulatedThemes;
    },
    {} as { [name: string]: Theme }
);

export const DEFAULT_THEME = themes.main;

export { Theme };
