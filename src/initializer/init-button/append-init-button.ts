import { initButton } from './init-button.css';
import { detectLocale } from '../../locale';

const getDefaultLabel = (): string => (detectLocale() === 'ru' ? 'Оплатить' : 'Pay');

const appendPayButtonStyles = (origin: string) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', `${origin}/checkout.css`);
    document.getElementsByTagName('head')[0].appendChild(link);
};

export const appendInitButton = (origin: string, appendEl: HTMLScriptElement, label: string): HTMLButtonElement => {
    appendPayButtonStyles(origin);
    const id = 'rbkmoney-button';
    // TODO: Temporary fix of button duplication when page has >1 scripts
    const button: HTMLButtonElement =
        (document.getElementById(id) as HTMLButtonElement) || document.createElement('button');
    button.id = id;
    button.className = initButton;
    button.innerHTML = label || getDefaultLabel();
    appendEl.parentNode.appendChild(button);
    return button;
};
