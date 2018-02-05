import { initButton } from './init-button.scss';
import { detectLocale } from 'checkout/utils';

const getDefaultLabel = (): string => detectLocale() === 'ru'
    ? 'Оплатить с помощью RBKmoney'
    : 'Pay with RBKmoney';

const appendPayButtonStyles = (origin: string) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', `${origin}/checkout.css`);
    document.getElementsByTagName('head')[0].appendChild(link);
};

export const appendInitButton = (origin: string, appendEl: HTMLScriptElement, label: string): HTMLButtonElement => {
    appendPayButtonStyles(origin);
    const button = document.createElement('button');
    button.className = initButton;
    button.innerHTML = label || getDefaultLabel();
    appendEl.parentNode.appendChild(button);
    return button;
};
